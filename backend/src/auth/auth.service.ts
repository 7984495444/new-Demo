import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user';
import { UserEntity } from '../entities';
import { JwtPayloadInterface } from './interfaces';
import { AuthModel } from '../dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayloadInterface): Promise<UserEntity | null> {
    return await this.userService.findUserByIdWithRole(payload.id);
  }

  async authenticate(auth: AuthModel): Promise<any> {
    const user = await this.userService.findByEmailWithPassword(auth.email);

    if (!user) {
      throw new BadRequestException('InvalidEmailError');
    }
    await this.userService.updateUserToken(user);

    const isRightPassword = await this.userService.compareHash(
      auth.password,
      user.password,
    );
    if (!isRightPassword) {
      throw new BadRequestException(
        'InvalidPasswordError'
      );
    }

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return {
      id: user.id,
      email: user.email,
      role_id: user.role_id,
      first_name: user.first_name,
      last_name: user.last_name,
      token: await this.jwtService.sign({ id: user.id, timeZone }),
    };
  }
}
