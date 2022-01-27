import Router from 'express';
import postController from '../controllers/todo-controller';
import authMiddleware from '../middlewares/auth-middleware';

const postsRouter = new Router();

postsRouter.get('/', authMiddleware, postController.getTodos);
postsRouter.post('/', authMiddleware, postController.postTodos);
postsRouter.delete('/:id', authMiddleware, postController.deleteTodos);

export default postsRouter;
