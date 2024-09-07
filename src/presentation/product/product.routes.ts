

import { Router } from "express";
import { ProductController } from "./product.controller";
import { ProductService } from "../services";
import { AuthMiddleWare } from "../middlewares/auth/auth.middleware";

export class ProductRoutes {

    static get routes(): Router {
        const router = Router();

        const service = new ProductService();
        const controller = new ProductController(service);

        router.get('/', controller.getProducts);
        router.post('/', [AuthMiddleWare.validateToken], controller.createProduct);
        // router.get('/:id', CategoryController.getCategoryById);
        // router.put('/:id', CategoryController.updateCategory);
        // router.delete('/:id', CategoryController.deleteCategory);
        return router;
    }
}