import { Express } from 'express';
import todosService from '../services/todos-service';

class TodoController {
  async getTodos(req: Express.Request, res: Express.Response, next) {
    try {
      const todos = await todosService.getTodos(req.user.id);

      return res.json(todos);
    } catch (e) {
      next(e);
    }
  }

  async postTodos(req: Express.Request, res: Express.Response, next) {
    try {
      const todo = await todosService.postTodos(req.body, req.user.id);

      return res.json(todo);
    } catch (e) {
      next(e);
    }
  }

  async deleteTodos(req: Express.Request, res: Express.Response, next) {
    try {
      const todo = await todosService.deleteTodos(req.params.id);

      return res.json(todo);
    } catch (e) {
      next(e);
    }
  }
}

export default new TodoController();
