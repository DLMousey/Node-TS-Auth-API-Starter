import { NextFunction, Request, Response } from "express";
import { IdentityService } from "../services/identity.service";
import { JwtService } from "../services/jwt.service";

export default async function verifyJwt(req: Request, res: Response, next: NextFunction) {

    const routeMap = [
        { path: '/api/example', method: 'GET', protected: false },
        { path: '/api/example/:id', method: 'GET', protected: false },
        { path: '/api/example', method: 'POST', protected: true },
        { path: '/api/example/:id', method: 'PUT', protected: true },
        { path: '/api/example/:id', method: 'DELETE', protected: true },
        { path: '/api/auth/register', method: 'POST', protected: false }
    ];

    let matchedRoute: any = routeMap.find((rc: any) => {
        if (rc.path === req.url && rc.method === req.method) {
            return rc;
        }

        const rcPathParts = rc.path.split("/");
        const reqPathParts = req.url.split("/");

        /**
         * Recombine the URL, replacing any parameterised sections of the route in the config,
         * with the values from the request URL itself, if the combined value matches the
         * structure set out in the config - this a match.
         */
        let replacedUrl = "";
        for (let i = 0; i < rcPathParts.length; i++) {
            if (rcPathParts[i].startsWith(":")) {
                replacedUrl += rcPathParts[i].replace(rcPathParts[i], reqPathParts[i]);
            } else {
                replacedUrl += rcPathParts[i];
            }

            if (i < rcPathParts.length - 1) {
                replacedUrl += "/";
            }
        }

        if (replacedUrl === req.url && rc.method === req.method) {
            return rc;
        }
    });

    const path = req.path;
    const method = req.method;
    console.log(req.route);

    if (matchedRoute === undefined) {
        matchedRoute = { path: req.path, method: req.method, protected: true }
    }

    if (!matchedRoute.protected && !req.header('authorization')) {
        return next();
    }

    const jwtValue = req.header('authorization');
    let jwt;

    if (matchedRoute.protected && !jwtValue) {
        res.status(401);
        res.json({
            status: 401,
            message: "Invalid credentials provided"
        });

        return next("Invalid credentials provided");
    }

    if (jwtValue) {
        jwt = jwtValue.replace('Bearer ', '');
    }

    const identityService = IdentityService.GetInstance();
    const jwtService = new JwtService();

    const result: any = jwtService.verifyJwt(jwt);

    if (result.status === JwtService.STATUS_INVALID) {
        res.status(401);
        res.json({
            status: 401,
            message: "Invalid credentials provided"
        });

        return next("Invalid credentials provided");
    } else if (result.status === JwtService.STATUS_EXPIRED && req.path === "/api/auth/refresh") {
        res.status(403);
        res.json({
            status: 403,
            message: "Access token has expired"
        });

        return next("Access token has expired");
    } else {
        identityService.setIdentity({
            email: result.data.sub,
            username: result.data.username,
            id: result.data.uid
        });

        return next();
    }
}
