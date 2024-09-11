import { Router } from 'express';
import { AuthRoutes, CategoryRoutes, FileUploadRoutes, ProductRoutes } from './modules';

export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/files', FileUploadRoutes.routes);

    return router;
  }


}

