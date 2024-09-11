import { Router } from 'express';
import { AuthRoutes } from './routes/auth.routes';
import { ProductRoutes } from './routes/product.routes';
import { CategoryRoutes } from './routes/category.routes';
import { FileUploadRoutes } from './routes/file-upload.routes';

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

