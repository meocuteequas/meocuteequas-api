import { v4 as uuidv4 } from 'uuid';
import { Cat } from '../../interfaces/cat.interface';
import { CreateCatDto } from './dtos/create-cats.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  all(): Cat[] {
    return this.cats;
  }

  only(id: string): Cat {
    const cat = this.cats.find((c) => c.id === id);
    if (cat === undefined)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return cat;
  }

  create(createCatDto: CreateCatDto): Cat {
    const cat = { ...createCatDto, id: uuidv4() };
    this.cats.push(cat);
    return cat;
  }
}
