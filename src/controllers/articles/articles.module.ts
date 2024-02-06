import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [
    ArticlesService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [ArticlesController],
})
export class ArticlesModule {
  constructor() {}
}
