import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  providers: [
    CatsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [CatsController],
})
export class CatModule {}
