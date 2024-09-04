import { Router } from 'express';
import { AuthRoutes } from './auth/auth.routes';
import { ProductRoutes } from './product/product.routes';
import { CategoryRoutes } from './category/category.routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/product', ProductRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);


    return router;
  }


}

