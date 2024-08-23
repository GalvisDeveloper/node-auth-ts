import { Request, Response } from "express";
import { SignUpDto } from "../../domain/dtos/auth/signUp.dto";
import { CustomError } from "../../domain/errors";
import { AuthService } from "../services/auth.service";
import { SignInDto } from "../../domain/dtos/auth/signIn.dto";

export class AuthController {

    //DI - Dependency Injection
    constructor(
        private readonly authService: AuthService
    ) { }

    signUp = (req: Request, res: Response) => {
        const [error, signUpDto] = SignUpDto.create(req.body);
        if (error) throw CustomError.badRequest(error, res);

        this.authService.signUp(signUpDto!)
            .then((data) => res.status(201).json(data))
            .catch((err) => CustomError.fromCode(err?.code, err.message, res));
    }

    signIn = (req: Request, res: Response) => {
        const [error, signInDto] = SignInDto.create(req.body);
        if (error) throw CustomError.badRequest(error, res);

        this.authService.signIn(signInDto!)
            .then((data) => res.status(200).json(data))
            .catch((err) => CustomError.fromCode(err?.code, err.message, res));
    }

    validateEmail = (req: Request, res: Response) => {
        res.json({ message: 'validateEmail' });
    }

}