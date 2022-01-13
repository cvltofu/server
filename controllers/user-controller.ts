import { Express } from 'express';
import { validationResult } from 'express-validator';
import userService from '../services/user-service';
import ApiError from '../exceptions/api-error';

class UserController {
  async registration(req: Express.Request, res: Express.Response, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw ApiError.BadRequest('Validation error.', errors.array());
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

  async activate(req: Express.Request, res: Express.Response, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async login(req: Express.Request, res: Express.Response, next) {
    try {
      const { email, password } = req.body;
      const { refreshToken, accessToken, user } = await userService.login(
        email,
        password
      );

      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json({ accessToken, user });
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Express.Request, res: Express.Response, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh() {}

  async getUsers() {}
}

export default new UserController();
