import Handler from "./Handler"
import DatabaseProxy from "../database/DatabaseProxy"

export default abstract class DefaultHandler<T, R> implements Handler<T, R> {
    protected readonly database: DatabaseProxy

    constructor(database: DatabaseProxy) {
        this.database = database
    }

    abstract validateRequest(request: any): Promise<T>

    abstract authenticateRequest(request: T): Promise<T>

    abstract authorizeRequest(request: T): Promise<T>

    abstract processRequest(request: T): Promise<R>

    async handleRequest(request: any): Promise<R> {
        return this.validateRequest(request)
            .then(validatedRequest => this.authenticateRequest(validatedRequest))
            .then(authenticatedRequest => this.authorizeRequest(authenticatedRequest))
            .then(authorizedRequest => this.processRequest(authorizedRequest))
    }
}
