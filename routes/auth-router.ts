import Router from 'express';
import { body } from 'express-validator';
import userController from '../controllers/auth-controller';

const router = new Router();

// использовать joi вместо express-validator
router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 16 }),
  userController.registration
);
// обернуть в функцию-обёртку вместо try-catch
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

export default router;
