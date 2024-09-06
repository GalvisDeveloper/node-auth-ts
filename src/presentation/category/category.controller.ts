import { Request, Response } from "express";
import { CreateCategoryDto } from "../../domain/dtos/category/create-category.dto";
import { CustomError } from "../../domain/errors";
import { CategoryService } from "../services/category/category.service";

export class CategoryController {

    //DI - Dependency Injection
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    getCategories = (req: Request, res: Response) => {
        this.categoryService.getCategories()
            .then(categories => res.status(200).json(categories))
            .catch(err => res.status(err.code).json({ message: err.message }));
    }


    createCategory = (req: Request, res: Response) => {

        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
        if (error) throw CustomError.badRequest(error, res);

        this.categoryService.createCategory(createCategoryDto!, req.body.user).then(category =>
            res.status(201).json(category)
        ).catch(err => {
            res.status(err.code).json({ message: err.message });
        });
    }

}