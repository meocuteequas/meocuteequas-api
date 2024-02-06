import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { ExtractJwt } from 'passport-jwt';
import { Database } from 'database.types';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ scope: Scope.REQUEST })
export class Supabase {
  private clientInstance: SupabaseClient<Database>;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService,
  ) {}

  async getClient() {
    if (this.clientInstance) return this.clientInstance;

    this.clientInstance = createClient<Database>(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_ANON_KEY'),
      // {
      //   auth: {
      //     persistSession: false,
      //   },
      //   global: {
      //     headers: {
      //       Authorization: `Bearer ${ExtractJwt.fromAuthHeaderAsBearerToken()(
      //         this.request,
      //       )}`,
      //     },
      //   },
      // },
    );
    return this.clientInstance;
  }
}
