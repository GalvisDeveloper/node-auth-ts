import { Request, Response } from "express";

export class ProductController {

    //DI - Dependency Injection
    constructor(
        // private readonly authService: AuthService
    ) { }

    getProducts = (req: Request, res: Response) => {
        res.status(200).json({ message: 'getCategories' });
    }

    createProduct = (req: Request, res: Response) => {
        res.status(201).json({ message: 'createCategory' });
    }

   
}