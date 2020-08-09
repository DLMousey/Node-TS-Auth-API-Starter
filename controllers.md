Controllers are the brains of the operation, when a request is picked up by [the router](routers.md), it's sent through to a controller to be processed.
It's generally recommended you keep your controllers small and minimise the amount of logic you write in them - preferring instead to defer heavy 
lifting and processing to [services](services.md)

All controllers are located in `src/controllers`, you will notice all files in this directory match the pattern of `<name>.controller.ts`

# Registering a new controller

- Create a file matching the naming convention - `<name>.controller.ts` in `src/controllers`

- Create a new class in this file matching this template, replacing instance of the world `Example` and your specific business logic in each method as appropriate;

```typescript
import { Controller } from "./controller";

export default class ExampleController extends Controller {

    constructor() {
        super();
    }

    public async getListAction(): Promise<any> {
        return this.jsonResponse(200, null, "Example Get List Action");
    }

    public async getAction(): Promise<any> {
        return this.jsonResponse(200, null, "Example Get Action");
    }

    public async createAction(): Promise<any> {
        return this.jsonResponse(200, null, "Example Post Action");
    }

    public async updateAction(): Promise<any> {
        return this.jsonResponse(200, null, "Example Put Action");
    }

    public async deleteAction(): Promise<any> {
        return this.jsonResponse(200, null, "Example Delete Action");
    }
}
```

- Modify the business logic in each method to match your requirements.

## Opinionated Controllers

This template repo is opinionated about what methods are available on controllers, meaning that arbitrary method names are not supported. This is due to the way
the request is passed from the router to the controller - you may notice that `res` and `req` are not being passed to the methods in the controller as arguments -
these parameters are passed to the parent `Controller` class that all controllers extend. 

The base `Controller` class provides essential functionality such as `jsonResponse` method and accessors for the `req` and `res` objects passed in from the router.

The reason controllers are so deliberately small in this template repo is a matter of opinion - this repo follows the philosophy of "Skinny controllers, fat models",
implying that controllers should serve only as jumping off points for other code.

Now that you have a controller, you should create a [service to do your heavy lifting](services.md)
