import { Request, Response } from "express";

import { Controller } from "./controller";
import { JwtService } from "../services/jwt.service";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";

export default class AuthController extends Controller {

    private readonly userService: UserService;
    private readonly jwtService: JwtService;

    constructor() {
        super();
        this.userService = new UserService();
        this.jwtService = new JwtService();
    }

    public async registration(req: Request, res: Response): Promise<any|void> {
        let user: User;
        let jwt: string;

        try {
            user = await this.userService.create(req.body);
            jwt = await this.jwtService.generateJwt(user);
        } catch (err) {
            if (err.detail.includes("already exists")) {
                res.status(400).json({
                    status: 400,
                    message: "An account already exists with this email address",
                    data: {
                        email: req.body.email
                    }
                });
            }

            res.status(400).json({
                status: 400,
                message: err.message,
                data: {}
            });
        }

        res.status(200).json({
            status: 200,
            message: "User created?",
            data: {
                user: User.ToViewModel(user),
                access_token: jwt
            }
        });
    }

    public async login(req: Request, res: Response): Promise<any|void> {
        super.request = req;
        super.response = res;

        if(!req.body.hasOwnProperty("email") || !req.body.hasOwnProperty("password")) {
            return this.jsonResponse(400, {}, "'email' and 'password' are both required");
        }

        const validationResult = await this.userService.validateCredentials(req.body.email, req.body.password);
        if (!validationResult) {
            return this.jsonResponse(401, {}, "Invalid credentials");
        }

        const user: User = await this.userService.findByEmail(req.body.email);
        if (!user) {
            return this.jsonResponse(401, {}, "Invalid credentials");
        }

        const jwt: string = await this.jwtService.generateJwt(user);
        return this.jsonResponse(200, {
            status: 200,
            message: "Authenticated successfully",
            data: {
                access_token: jwt
            }
        });
    }

    public async refresh(req: Request, res: Response): Promise<any|void> {
        return this.jsonResponse(500, {}, "Not implemented - refresh");
    }
}
