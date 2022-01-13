import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import userModel from '../models/user-model';
import mailService from './mail-service';
import UserDto from '../dtos/user-dto';

class UserService {
  async registration(email: string, password: string) {
    const candidate = await userModel.findOne({ email });

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

  async activate() {}

  async login() {}

  async logout() {}

  async refresh() {}

  async getAllUsers() {}
}

export default new UserService();
