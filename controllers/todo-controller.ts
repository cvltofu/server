import todosService from '../services/todos-service';

class TodoController {
  async getTodos(req, res, next) {
    try {
      const todos = await todosService.getTodos();

      return res.json(todos);
    } catch (e) {
      next(e);
    }
  }

  async postTodos(req, res, next) {
    try {
      const { date, title, task } = req.body;
      const todo = await todosService.postTodos(date, title, task);

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
