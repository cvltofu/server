/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */

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
