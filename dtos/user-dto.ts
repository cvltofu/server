/* eslint-disable no-underscore-dangle */

export default class UserDto {
  email: string;

  id: string;

  isActivated: boolean;

  constructor(model) {
    (this.email = model.email)((this.id = model._id))(
      (this.isActivated = model.isActivated)
    );
  }
}
