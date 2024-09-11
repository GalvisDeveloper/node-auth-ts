import { Router } from "express";
import { AuthMiddleWare } from "../../middlewares/auth/auth.middleware";
import { FileUploadService } from "./file-upload.service";
import { FileUploadController } from "./file-upload.controller";

export class FileUploadRoutes {

    static get routes(): Router {
        const router = Router();

        const service = new FileUploadService();
        const controller = new FileUploadController(service);

        // api/upload/single/<user|product|category>
        // api/upload/multiple/<user|product|category>
        router.post('/single/:type', [AuthMiddleWare.validateToken], controller.uploadFile);
        router.post('/multiple/:type', [AuthMiddleWare.validateToken], controller.uploadFileMultiple);

        return router;
    }
}