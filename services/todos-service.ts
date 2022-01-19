import TodoDto from '../dtos/todo-dto';
import todoModel from '../models/todo-model';

class TodosService {
  async getTodos() {
    const todos = await todoModel.find({}, null, { limit: 10 });

    return todos;
  }

  async postTodos(date, title, task) {
    const todo = await todoModel.create({
      date,
      title,
      task,
    });

    const todoDto = new TodoDto(todo);

    return { todo: todoDto };
  }

  async deleteTodos(_id) {
    const todo = await todoModel.findByIdAndDelete(_id);

    return todo;
  }
}

export default new TodosService();
