export class ValidationError extends Error {
    constructor (message: string, public errors: Record<string, string[]>) {
        super(message);
        this.name = 'ValidationError'
    }
}