import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [
    UsersModule,
    SupabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [AuthService],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
