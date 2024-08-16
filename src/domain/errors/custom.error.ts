import { Response } from "express";



export class CustomError extends Error {

    private constructor(
        public readonly code: number,
        public readonly message: string,
    ) {
        super(message);
    }

    static handleError(err: string | Error, code: number, res?: Response): string | Error | Response<any, Record<string, any>> {
        //save logger
        if (!res) return err;
        return res.status(code).json({ message: err instanceof Error ? err.message : err });
    }

    static badRequest(message: string, res?: Response) {
        this.handleError(message, 400, res);
    }

    static unauthorized(message: string, res?: Response) {
        this.handleError(message, 401, res);
    }

    static forbidden(message: string, res?: Response) {
        this.handleError(message, 403, res);
    }

    static notFound(message: string, res?: Response) {
        this.handleError(message, 404, res);
    }

    static conflict(message: string, res?: Response) {
        this.handleError(message, 409, res);
    }

    static internal(error: string, res?: Response) {
        this.handleError(error, 500, res);
    }

    static fromCode(code: number, message: string, res?: Response) {
        this.handleError(message, code, res);
    }

}