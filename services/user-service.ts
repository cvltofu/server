import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import userModel from '../models/user-model';
import mailService from './mail-service';
import UserDto from '../dtos/user-dto';
import tokenService from './token-service';
import ApiError from '../exceptions/api-error';

class UserService {
  async registration(email: string, password: string) {
    const candidate = await userModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        `A user with an email ${email} already exists.`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    const user = await userModel.create({
      email,
      password: hashPassword,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
    const user = await userModel.findOne({ activationLink });

    if (!user) {
      throw new Error();
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh() {}

  async getAllUsers() {}
}

export default new UserService();
