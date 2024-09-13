


import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../domain/errors";

export class FileUploadMiddleware {

    static async containFiles(req: Request, res: Response, next: NextFunction) {

        const filesRequest = req.files;

        if (!filesRequest || Object.keys(filesRequest).length === 0) {
            return CustomError.badRequest('No files were uploaded', res);
        }

        req.body.files = !Array.isArray(filesRequest.file) ? [filesRequest.file] : filesRequest.file;

        next();

    }

    static async checkTypes(req: Request, res: Response, next: NextFunction) {
        const type = req.params.type;

        const validTypes = ['users', 'products', 'categories'];

        if (!validTypes.includes(type)) {
            return CustomError.badRequest(`Invalid type ${type}, valid ones ${validTypes}`, res);
        }
    }

    static async containFilesMultiple(req: Request, res: Response, next: NextFunction) {

    }



}