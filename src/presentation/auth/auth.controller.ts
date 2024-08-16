import { Request, Response } from "express";
import { SignUpDto } from "../../domain/dtos/auth/signUp.dto";
import { CustomError } from "../../domain/errors";
import { AuthService } from "../services/auth.service";



export class AuthController {

    //DI - Dependency Injection
    constructor(
        private readonly authService: AuthService
    ) { }

    // private handleError(res: Response, err: unknown) {
    //     if (err instanceof CustomError) return res.status(err.statusCode).json({ message: err.message });
    //     return res.status(500).json({ message: `Internal server error - check logs` })
    // }

    signUp = (req: Request, res: Response) => {
        const [error, signUpDto] = SignUpDto.create(req.body);
        if (error) throw CustomError.badRequest(error, res);

        this.authService.signUp(signUpDto!)
            .then((data) => res.status(201).json(data))
            .catch((err) => CustomError.fromCode(err?.code, err.message, res));
        // res.json({ message: 'User registered successfully', data: signUpDto });
    }


    signIn = (req: Request, res: Response) => {
        res.json({ message: 'signIn' });
    }

    validateEmail = (req: Request, res: Response) => {
        res.json({ message: 'validateEmail' });
    }

}