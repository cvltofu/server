/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */

export default class PostDto {
  content: string;

  id: string;

  constructor(model) {
    (this.content = model.content), (this.id = model._id);
  }
}
