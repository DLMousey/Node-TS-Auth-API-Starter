import { Request, Response } from "express";

export abstract class Controller {

    protected request: Request;
    protected response: Response;

    public async getList(req: Request, res: Response) {
        this.request = req;
        this.response = res;

        try {
            await this.getListAction();
        } catch (err) {
            this.response.status(500).json({message: err.message});
        }
    }

    public async get(req: Request, res: Response) {
        this.request = req;
        this.response = res;

        try {
            await this.getAction();
        } catch (err) {
            this.response.status(500).json({message: err.message});
        }
    }

    public async create(req: Request, res: Response) {
        this.request = req;
        this.response = res;

        try {
            await this.createAction();
        } catch (err) {
            this.response.status(500).json({message: err.message});
        }
    }

    public async update(req: Request, res: Response) {
        this.request = req;
        this.response = res;

        try {
            await this.updateAction();
        } catch (err) {
            this.response.status(500).json({message: err.message});
        }
    }

    public async delete(req: Request, res: Response) {
        this.request = req;
        this.response = res;

        try {
            await this.deleteAction();
        } catch (err) {
            this.response.status(500).json({message: err.message});
        }
    }

    protected jsonResponse(status: number, data: any, message?: string): Response  {
        if (message) {
            return this.response.status(status).json({
                status, message, data
            });
        } else {
            return this.response.status(status).json({
                status, data
            });
        }
    }

    protected async sendNotImplementedResponse(): Promise<void> {
        this.response.status(405).json({
            message: "Not Implemented"
        });
    }

    protected getListAction(): Promise<void | any> {
        return this.sendNotImplementedResponse();
    }

    protected getAction(): Promise<void | any> {
        return this.sendNotImplementedResponse();
    }

    protected createAction(): Promise<void | any> {
        return this.sendNotImplementedResponse();
    }

    protected updateAction(): Promise<void | any> {
        return this.sendNotImplementedResponse();
    }

    protected deleteAction(): Promise<void | any> {
        return this.sendNotImplementedResponse();
    }
}
