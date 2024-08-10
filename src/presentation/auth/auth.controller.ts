import { Request, Response } from "express";



export class AuthController {

    //DI - Dependency Injection
    constructor(
        // private readonly authService: AuthService
    ) { }

    signUp = (req: Request, res: Response) => {
        res.json({ message: 'signUp' });
    }


    signIn = (req: Request, res: Response) => {
        res.json({ message: 'signIn' });
    }

    validateEmail = (req: Request, res: Response) => {
        res.json({ message: 'validateEmail' });
    }

}