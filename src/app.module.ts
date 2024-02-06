import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SupabaseModule } from './supabase/supabase.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AuthModule } from './controllers/auth/auth.module';
import { CatModule } from './controllers/cats/cat.module';
import { ArticlesModule } from './controllers/articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    SupabaseModule,
    CatModule,
    AuthModule,
    ArticlesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
