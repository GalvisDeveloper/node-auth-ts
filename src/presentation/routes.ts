import { Router } from 'express';
import { AuthRoutes, CategoryRoutes, FileUploadRoutes, ProductRoutes } from './modules';
import { ImagesRoutes } from './modules/images/images.routes';

export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/files', FileUploadRoutes.routes);
    router.use('/api/images', ImagesRoutes.routes);

    return router;
  }


}

