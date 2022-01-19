import Router from 'express';
import { body } from 'express-validator';
import userController from '../controllers/auth-controller';

const authRouter = new Router();

// использовать joi вместо express-validator
authRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 16 }),
  userController.registration
);
// обернуть в функцию-обёртку вместо try-catch
authRouter.post('/login', userController.login);
authRouter.post('/logout', userController.logout);
authRouter.get('/activate/:link', userController.activate);
authRouter.get('/refresh', userController.refresh);

export default authRouter;
