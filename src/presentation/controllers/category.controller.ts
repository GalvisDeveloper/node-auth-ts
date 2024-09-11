import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from "../services";

export class CategoryController {

    //DI - Dependency Injection
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    getCategories = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;

        const [error, paginationDto] = PaginationDto.create({ page, limit });
        if (error) throw CustomError.badRequest(error, res);

        this.categoryService.getCategories(paginationDto!)
            .then(categories => res.status(200).json(categories))
            .catch(err => res.status(err.code).json({ message: err.message }));
    }


    createCategory = (req: Request, res: Response) => {

        const [error, createCategoryDto] = CreateCategoryDto
            .create(req.body);
        if (error) throw CustomError.badRequest(error, res);

        this.categoryService.createCategory(createCategoryDto!, req.body.user).then(category =>
            res.status(201).json(category)
        ).catch(err => {
            res.status(err.code).json({ message: err.message });
        });
    }

}