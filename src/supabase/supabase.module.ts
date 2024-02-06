import { Module } from '@nestjs/common';
import { Supabase } from './supabase.service';
import { SupabaseGuard } from 'src/guards/supabase.guard';
import { SupabaseStrategy } from './supabase.strategy';

@Module({
  providers: [Supabase, SupabaseStrategy, SupabaseGuard],
  exports: [Supabase, SupabaseStrategy, SupabaseGuard],
})
export class SupabaseModule {}
