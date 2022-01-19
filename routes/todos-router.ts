import Router from 'express';
import todoController from '../controllers/todo-controller';
import authMiddleware from '../middlewares/auth-middleware';

const router = new Router();

router.get('/todos/', authMiddleware, todoController.getTodos);
router.post('/todos/', authMiddleware, todoController.postTodos);
router.delete('/todos/:id', authMiddleware, todoController.deleteTodos);

export default router;
