import {
  Body,
  Get,
  Post,
  Request,
  HttpCode,
  HttpStatus,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dtos/sign-in.dto';
import { UsersService } from '../users/users.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() { name, password }: SignInDto) {
    const user = await this.usersService.findOne(name);
    if (user === undefined || user.password !== password)
      throw new UnauthorizedException();

    const payload = { sub: user.id, name: user.name, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
