import {
  Controller,
  Delete,
  Get,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtStrategyResponse } from '../auth/interfaces/jwt-strategy-response';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findMe(@Request() { user }: { user: JwtStrategyResponse }) {
    return this.usersService.findMe(user);
  }

  @Delete()
  removeUser(@Query('id') id: string) {
    return this.usersService.remove(id);
  }
}
