/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */

export default class TodoDto {
  date: Date;

  title: string;

  task: string;

  id: string;

  constructor(model) {
    (this.date = model.date),
      (this.title = model.title),
      (this.task = model.task),
      (this.id = model._id);
  }
}
