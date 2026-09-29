import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { JwtStrategyResponse } from '../auth/interfaces/jwt-strategy-response';
import { User } from './entities/user.entity';

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

  async findByEmailForAuth(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async create(dto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({
      email: dto.email,
    });

    if (existingUser) {
      throw new BadRequestException(
        'A user with the same email already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    const { password: _, ...userInfo } = user;

    return userInfo;
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async findMe(user: JwtStrategyResponse) {
    const response = await this.findOne(user.id);
    if (!response) {
      throw new ServiceUnavailableException('Error retrieving current user');
    }

    return response;
  }
}
