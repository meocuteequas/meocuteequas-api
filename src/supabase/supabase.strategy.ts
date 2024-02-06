import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SUPABASE_JWT_SECRET'),
    });
  }

  async validate(request: Request) {
    return request;
  }
}
