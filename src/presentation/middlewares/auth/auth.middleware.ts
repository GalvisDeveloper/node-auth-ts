import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { UserModel } from "../../../data";
import { UserEntity } from "../../../domain/entities/user";
import { CustomError } from "../../../domain/errors";

export class AuthMiddleWare {

    static async validateToken(req: Request, res: Response, next: NextFunction) {

        const authorization = req.headers.authorization;
        if (!authorization) return CustomError.unauthorized('Token not provided', res);
        if (!authorization.startsWith('Bearer ')) return CustomError.unauthorized('Invalid Bearer Token', res);
        const token = authorization.split(' ').at(1) || ''; // Same that [1]
        try {
            const decoded = await JwtAdapter.verifyToken<{ id: string }>(token);
            if (!decoded) return CustomError.unauthorized('Invalid token', res);
            const user = await UserModel.findById(decoded.id);
            if (!user) return CustomError.notFound('User not found', res);

            // todo: validate active user
            req.body.user = UserEntity.fromObject(user);
            next();

        } catch (err) {
            console.log(err);
            return CustomError.internal(`${err}`, res);
        }

    }

}