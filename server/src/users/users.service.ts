import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtStrategyResponse } from '../auth/interfaces/jwt-strategy-response';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(dto: CreateUserDto) {
    const user = await this.usersRepository.save(dto);
    if (!user) new ServiceUnavailableException('Error creating user');

    const { password: _, ...userInfo } = user;

    return userInfo;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findMe(user: JwtStrategyResponse) {
    const response = await this.findOne(user.id);
    if (!response)
      throw new ServiceUnavailableException('Error retrieving current user');

    return response;
  }
}
