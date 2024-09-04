import { Router } from "express";
import { CategoryController } from "./category.controller";

export class CategoryRoutes {

    static get routes(): Router {
        const router = Router();

        const controller = new CategoryController();

        router.get('/', controller.getCategories);
        router.post('/', controller.createCategory);
        // router.get('/:id', CategoryController.getCategoryById);
        // router.put('/:id', CategoryController.updateCategory);
        // router.delete('/:id', CategoryController.deleteCategory);
        return router;
    }
}