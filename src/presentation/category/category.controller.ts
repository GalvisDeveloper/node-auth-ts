import { Request, Response } from "express";

export class CategoryController {

    //DI - Dependency Injection
    constructor(
        // private readonly authService: AuthService
    ) { }

    getCategories = (req: Request, res: Response) => {
        res.status(200).json({ message: 'getCategories' });
    }

    createCategory = (req: Request, res: Response) => {
        res.status(201).json({ message: 'createCategory' });
    }

   
}