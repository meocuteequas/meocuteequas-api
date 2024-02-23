import { UsersService } from '../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly service: UsersService) {}

  async login(username: string, password: string) {
    const user = await this.service.findOne(username);

    if (user) return user;

    throw new UnauthorizedException('Username or password is incorrect');
  }
}
