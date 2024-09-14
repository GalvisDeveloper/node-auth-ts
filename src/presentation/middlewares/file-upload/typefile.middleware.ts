


import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../domain/errors";

export class TypeFileMiddleware {

    static validTypes(validTypes: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const type = req.url.split('/').pop() ?? '';

            if (!validTypes.includes(type)) {
                return CustomError.badRequest(`Invalid type ${type}, valid ones ${validTypes}`, res);
            }

            next();
        }
    }

}