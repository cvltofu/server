import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import userModel from '../models/user-model';
import mailService from './mail-service';
import UserDto from '../dtos/user-dto';
import tokenService from './token-service';
import ApiError from '../exceptions/api-error';

class UserService {
  async registration({ username, email, password }) {
    const candidate = await userModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        `A user with an email ${email} already exists.`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/auth/activate/${activationLink}`
    );

    return this.generateSaveAndGetTokens(user);
  }

  async activate(activationLink: string) {
    const user = await userModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest('Invalid activation link.');
    }

    user.isActivated = true;
    await user.save();
  }

  async login({ email, password }) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest('The user with this email was not found.');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Invalid password.');
    }

    return this.generateSaveAndGetTokens(user);
  }

  async logout({ refreshToken }) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh({ refreshToken }) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await userModel.findById(userData.id);

    return this.generateSaveAndGetTokens(user);
  }

  private async generateSaveAndGetTokens(user: Record<string, never>) {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

export default new UserService();
