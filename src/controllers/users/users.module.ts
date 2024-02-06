import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
