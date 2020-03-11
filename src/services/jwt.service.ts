import jwt, { SignOptions } from "jsonwebtoken";

import { User } from "../entities/user.entity";

export interface JwtVerificationResult {
    status: number;
    data: any;
}

export class JwtService {

    public static STATUS_VALID = 0;
    public static STATUS_INVALID = 1;
    public static STATUS_EXPIRED = 2;

    async generateJwt(user: User): Promise<string> {
        const jwtOptions: SignOptions = {
            algorithm: "HS256",
            expiresIn: process.env.JWT_LIFESPAN + "m"
        };

        const payload = {
            sub: user.email,
            username: user.username,
            uid: user.id
        };

        return jwt.sign(payload, process.env.JWT_SIGNING_KEY, jwtOptions);
    }

    verifyJwt(token: string): JwtVerificationResult {
        let result: any;

        try {
            result = jwt.verify(token, process.env.JWT_SIGNING_KEY);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return {
                    status: JwtService.STATUS_EXPIRED,
                    data: jwt.decode(token)
                }
            }

            return {
                status: JwtService.STATUS_INVALID,
                data: jwt.decode(token)
            }
        }

        if(!result) {
            return {
                status: JwtService.STATUS_INVALID,
                data: result
            }
        }

        if (result.exp < (new Date()).getTime() / 1000) {
            return {
                status: JwtService.STATUS_EXPIRED,
                data: result
            }
        }

        return {
            status: JwtService.STATUS_VALID,
            data: result
        }
    }
}
