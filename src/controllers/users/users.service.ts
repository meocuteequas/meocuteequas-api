import { Role } from 'src/enums/role.enum';
import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'meocuteequas',
      password: 'password',
      roles: [Role.Admin],
    },
    {
      id: 2,
      name: 'chicuteequas',
      password: 'password',
      roles: [Role.User],
    },
  ];

  async findOne(name: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === name);
  }
}
