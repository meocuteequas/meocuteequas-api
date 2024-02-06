import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { Public } from 'src/decorators/public.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get(':uuid')
  @Public()
  // @Roles(Role.Admin, Role.User)
  async only(
    @Param(
      'uuid',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    uuid: string,
  ) {
    const article = await this.articleService.only(uuid);

    return article;
  }

  @Post()
  @Roles(Role.Admin)
  async create() {
    const article = await this.articleService.create();

    return article;
  }
}
