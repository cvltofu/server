import todosService from '../services/todos-service';

class TodoController {
  async getTodos(req, res, next) {
    try {
      const todos = await todosService.getTodos(req.user.id);

      return res.json(todos);
    } catch (e) {
      next(e);
    }
  }

  async postTodos(req, res, next) {
    try {
      const todo = await todosService.postTodos(req.body, req.user.id);

      return res.json(todo);
    } catch (e) {
      next(e);
    }
  }

  async deleteTodos(req, res, next) {
    try {
      const todo = await todosService.deleteTodos(req.params.id);

      return res.json(todo);
    } catch (e) {
      next(e);
    }
  }
}

export default new TodoController();
