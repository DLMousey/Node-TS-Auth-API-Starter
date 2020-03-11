import { Router } from "express";

import { ApiRouter } from "./api-router.interface";
import AuthController from "../controllers/auth.controller";

export default class AuthRouter implements ApiRouter {

    public path = "/api/auth";
    public router: Router;
    public controller: AuthController;

    constructor() {
        this.router = Router();
        this.controller = new AuthController();

        this.initRoutes();
    }

    initRoutes(): void {
        this.router.post("/register", (req, res) => this.controller.registration(req, res));
        this.router.post("/login", (req, res) => this.controller.login(req, res));
        this.router.post("/refresh", (req, res) => this.controller.refresh(req, res));
    }
}
