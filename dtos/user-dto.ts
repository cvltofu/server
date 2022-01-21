/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */

export default class UserDto {
  username: string;

  email: string;

  id: string;

  isActivated: boolean;

  constructor(model) {
    (this.username = model.username),
      (this.email = model.email),
      (this.id = model._id),
      (this.isActivated = model.isActivated);
  }
}
