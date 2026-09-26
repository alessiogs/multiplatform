import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 'a1',
      username: 'john',
      email: 'john@email.com',
      password: 'changeme',
    },
    {
      id: 'a2',
      username: 'maria',
      email: 'maria@email.com',
      password: 'guess',
    },
  ];

  async findOne(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
