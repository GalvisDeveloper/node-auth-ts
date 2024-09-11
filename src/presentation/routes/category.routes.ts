import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { AuthMiddleWare } from "../middlewares/auth/auth.middleware";
import { CategoryService } from "../services";

export class CategoryRoutes {

    static get routes(): Router {
        const router = Router();

        const service = new CategoryService();
        const controller = new CategoryController(service);

        router.get('/', [AuthMiddleWare.validateToken], controller.getCategories);
        router.post('/', [AuthMiddleWare.validateToken], controller.createCategory);
        // router.get('/:id', CategoryController.getCategoryById);
        // router.put('/:id', CategoryController.updateCategory);
        // router.delete('/:id', CategoryController.deleteCategory);
        return router;
    }
}