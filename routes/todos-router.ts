import Router from 'express';
import todoController from '../controllers/todo-controller';
import authMiddleware from '../middlewares/auth-middleware';

const todosRouter = new Router();

todosRouter.get('/', authMiddleware, todoController.getTodos);
todosRouter.post('/', authMiddleware, todoController.postTodos);
todosRouter.delete('/:id', authMiddleware, todoController.deleteTodos);

export default todosRouter;
