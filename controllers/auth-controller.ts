import { Express } from 'express';
import { validationResult } from 'express-validator';
import authService from '../services/auth-service';
import ApiError from '../exceptions/api-error';
import authSchema from '../validators/reg-validation';

class UserController {
  async registration(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    try {
      const { error } = authSchema.validate(req.body);

      if (error) {
        throw ApiError.BadRequest('Validation error.', error.details);
      }

      const userData = await authService.registration(req.body);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async activate(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    try {
      const activationLink = req.params.link;
      await authService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async login(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    try {
      const { refreshToken, accessToken } = await authService.login(req.body);

      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json({ accessToken });
    } catch (e) {
      next(e);
    }
  }

  async logout(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    try {
      const token = await authService.logout(req.cookies);
      res.clearCookie('refreshToken');

      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    try {
      const { refreshToken, accessToken } = await authService.refresh(
        req.cookies
      );

      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json({ accessToken });
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
