import { Router } from "express";
import { ApiRouter } from "./api-router.interface";
import { Controller } from "./../controllers/controller";
import ExampleController from "./../controllers/example.controller";

export default class ExampleRouter implements ApiRouter {

    public path = "/api/example";
    public router: Router;
    public controller: Controller;

    constructor() {
        this.router = Router();
        this.controller = new ExampleController();

        this.initRoutes();
    }

    initRoutes(): void {
        this.router.get("/", (req, res) => this.controller.getList(req, res));
        this.router.get("/:id", (req, res) => this.controller.get(req, res));
        this.router.post("/", (req, res) => this.controller.create(req, res));
        this.router.put("/:id", (req, res) => this.controller.update(req, res));
        this.router.delete("/:id", (req, res) => this.controller.delete(req, res));

    }
}
