import Router from 'express';
import userController from '../controllers/auth-controller';

const authRouter = new Router();

authRouter.post('/registration', userController.registration);
authRouter.post('/login', userController.login);
authRouter.post('/logout', userController.logout);
authRouter.get('/activate/:link', userController.activate);
authRouter.get('/refresh', userController.refresh);

export default authRouter;
