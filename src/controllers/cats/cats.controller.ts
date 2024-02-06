import {
  Get,
  Post,
  Body,
  Param,
  Query,
  Controller,
  HttpStatus,
  ParseIntPipe,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { CatsService } from './cats.service';
import { Cat } from '../../interfaces/cat.interface';
import { CreateCatDto } from './dtos/create-cats.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  @Roles(Role.Admin, Role.User)
  async all(@Query('page', ParseIntPipe) page: number): Promise<Cat[]> {
    const cats = this.catsService.all();
    return cats;
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  async only(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<Cat> {
    const cat = this.catsService.only(id);
    return cat;
  }

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }
}
