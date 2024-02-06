import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Supabase } from 'src/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabase: Supabase) {}

  async signIn(username: string, password: string): Promise<any> {
    const client = await this.supabase.getClient();

    const { data, error } = await client.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (error) throw new UnauthorizedException(error);
    return data;
  }
}
