/**
 * Thrown by the HTTP layer on a 422 response, carrying Laravel's per-field
 * validation errors alongside the top-level message.
 */
export class ValidationError extends Error {
    constructor(message: string, public errors: Record<string, string[]>) {
        super(message);
        this.name = 'ValidationError';
    }
}
