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
