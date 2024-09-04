import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService, EmailService } from '../services';

export class AuthRoutes {


  static get routes(): Router {

    const router = Router();

    const emailService = new EmailService();
    const authService = new AuthService(emailService);
    const controller = new AuthController(authService);

    // Definir las rutas
    router.post('/login', controller.signIn);
    router.post('/register', controller.signUp);

    router.get('/validate-email/:token', controller.validateEmail);


    return router;
  }


}

