import { Router } from "express";
import { AuthMiddleWare } from "../../middlewares/auth/auth.middleware";
import { FileUploadService } from "./file-upload.service";
import { FileUploadController } from "./file-upload.controller";
import { FileUploadMiddleware } from "../../middlewares/file-upload/file-upload.middleware";
import { TypeFileMiddleware } from "../../middlewares/file-upload/typefile.middleware";

export class FileUploadRoutes {

    static get routes(): Router {
        const router = Router();

        const service = new FileUploadService();
        const controller = new FileUploadController(service);

        router.use(AuthMiddleWare.validateToken);
        router.use(FileUploadMiddleware.containFiles);
        router.use(TypeFileMiddleware.validTypes(['users', 'products', 'categories']));

        // api/upload/single/<user|product|category>
        // api/upload/multiple/<user|product|category>
        router.post('/single/:type', controller.uploadFile);
        router.post('/multiple/:type', controller.uploadFileMultiple);

        return router;
    }
}