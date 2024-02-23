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
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() { name, password }: SignInDto) {
    const user = await this.authService.login(name, password);

    if (user === null)
      throw new UnauthorizedException('Không biết nói sao nữa');

    const accessToken = await this.jwtService.signAsync(user);
    return {
      access_token: accessToken,
    };
  }

  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
