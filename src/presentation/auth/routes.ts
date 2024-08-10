import { Router } from 'express';
import { AuthController } from './auth.controller';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();

    const controller = new AuthController();



    // Definir las rutas
    router.post('/login', controller.signIn);
    router.post('/register', controller.signUp);

    router.get('/validate-email/:token', controller.validateEmail);


    return router;
  }


}

