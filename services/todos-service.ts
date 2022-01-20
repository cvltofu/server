import TodoDto from '../dtos/todo-dto';
import todoModel from '../models/todo-model';

class TodosService {
  async getTodos(id) {
    const todos = await todoModel.find({ userId: id });

    return todos;
  }

  async postTodos({ date, title, task }, id: string) {
    const todo = await todoModel.create({
      date,
      title,
      task,
      userId: id,
    });

    const todoDto = new TodoDto(todo);

    return { todo: todoDto };
  }

  async deleteTodos(_id: string) {
    const todo = await todoModel.findByIdAndDelete(_id);

    return todo;
  }
}

export default new TodosService();
