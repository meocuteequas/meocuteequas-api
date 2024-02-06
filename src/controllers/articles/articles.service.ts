import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Supabase } from 'src/supabase/supabase.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly supabase: Supabase) {}

  async only(uuid: string) {
    const client = await this.supabase.getClient();

    const { data, error } = await client
      .from('articles')
      .select('*, translations (title, content)')
      .eq('id', uuid)
      .single();

    if (error) throw new NotFoundException(error);

    return data;
  }

  async create() {
    const client = await this.supabase.getClient();
    const { data, error } = await client.from('articles').insert([{}]).select();

    if (error) throw new BadRequestException(error);
    return data;
  }
}
