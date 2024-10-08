import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { CreateProductDto, CustomError, PaginationDto } from "../../../domain";

export class ProductController {

    //DI - Dependency Injection
    constructor(
        private readonly productService: ProductService
    ) { }

    getProducts = (req: Request, res: Response) => {
        const { page = 1, limit = 10 } = req.query;

        const [error, paginationDto] = PaginationDto.create({ page, limit });
        if (error) throw CustomError.badRequest(error, res);

        this.productService.getCategories(paginationDto!)
            .then(products => res.status(200).json(products))
            .catch(err => res.status(err.code).json({ message: err.message }));
    }

    createProduct = (req: Request, res: Response) => {

        const [error, createProductDto] = CreateProductDto.create({ ...req.body, user: req.body.user.id });
        if (error) throw CustomError.badRequest(error, res);

        this.productService.createProduct(createProductDto!)
            .then(product => res.status(201).json(product))
            .catch(err => { res.status(err.code).json({ message: err.message }); });
    }



}