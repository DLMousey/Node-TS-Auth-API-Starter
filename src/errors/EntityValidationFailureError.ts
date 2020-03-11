export default class EntityValidationFailureError extends Error {

    public message: string;
    public errors: any[];

    constructor(message: string, errors: any[]) {
        super();
        this.message = message;
        this.errors = errors;
    }
}
