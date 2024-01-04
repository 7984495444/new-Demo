import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { AuthModel, ForgotPasswordModel, UserModel } from '../dto';
import { AuthService } from './auth.service';
import { UserService } from '../user';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body(new ValidationPipe()) auth: AuthModel): Promise<string> {
    return this.authService.authenticate(auth);
  }

  @Post('/forgot-password')
  @HttpCode(200)
  async forgotPassword(
    @Body(new ValidationPipe()) forgotPassword: ForgotPasswordModel,
  ): Promise<any> {
    const user = await this.userService.findByEmailWithPassword(
      forgotPassword.email,
    );
    if (!user) {
      throw new BadRequestException('Enter a valide email.');
    }
    // var password = new Array(10)
    //   .fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
    //   .map((x) =>
    //     (function (chars) {
    //       let umax = Math.pow(2, 32),
    //         r = new Uint32Array(1),
    //         max = umax - (umax % chars.length);
    //       do {
    //         crypto.getRandomValues(r);
    //       } while (r[0] > max);
    //       return chars[r[0] % chars.length];
    //     })(x),
    //   )
    //   .join('');
    this.userService.forgotPassword(user, 'password');
    return 'password';
  }

  @Post('/register')
  async register(
    @Body(new ValidationPipe()) userModel: UserModel,
  ): Promise<string> {
    const emailExists = await this.userService.findByEmail(userModel.email);

    if (emailExists) {
      throw new ConflictException('E-mail already use.');
    }

    await this.userService.create(userModel);

    return this.authService.authenticate(userModel);
  }
}
