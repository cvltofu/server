import { validationResult } from 'express-validator';
import userService from '../services/user-service';
import ApiError from '../exceptions/api-error.js';

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error.', errors.array()));
      }

      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login() {}

  async logout() {}

  async activate() {}

  async refresh() {}

  async getUsers() {}
}

export default new UserController();
