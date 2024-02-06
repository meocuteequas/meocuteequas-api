import { Role } from 'src/enums/role.enum';

export interface User {
  id: number;
  name: string;
  password: string;
  roles: Role[];
}
