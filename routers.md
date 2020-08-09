Routers are responsible for determining if an incoming request matches an endpoint that your API has exposed.
Located in `src/routes`, you will notice that all files in this directory match the pattern of `<name>.router.ts`, apart from `index.ts`
which is used to make importing routers much easier during application startup.

# Registering a new router

- Create a file matching the naming convention - `<name>.router.ts` in `src/routes`

- Create a new class in this file matching this template, replacing instances of the word `Example`
  and your specific routes in `initRoutes` as appropriate;
  
```typescript
import { Router } from "express";
import { ApiRouter } from "./api-router.interface";
import { Controller } from "./../controllers/controller";
import ExampleController from "./../controllers/example.controller";

export default class ExampleRouter implements ApiRouter {
    
    public path = "/api/example";
    public router: Router;
    public controller: ExampleController;
    
    constructor() {
        this.router = Router();
        this.controller = new ExampleController();
        
        this.initRoutes();
    } 

    initRoutes(): void {
        this.router.get("/example", (req, res) => this.controller.getList(req, res));
        this.router.get("/example/:id", (req, res) => this.controller.get(req, res));
        this.router.post("/example", (req, res) => this.controller.create(req, res));
        this.router.put("/example/:id", (req, res) => this.controller.update(req, res));
        this.router.delete("/example/:id", (req, res) => this.controller.delete(req, res));
    }
}
```

- Register your router in `src/routers/index.ts` so it's available for registration during application startup.
If you do not perform this step your routes will not be registered and will return a 404 response.

```typescript
//... Other routers
import ExampleRouter from "./example.router";

export {
    //... Other routers
    ExampleRouter
}
```

Now that you've created and registered a router, you should add a [controller to go with it](controllers.md)
