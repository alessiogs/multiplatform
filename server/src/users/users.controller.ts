import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { JwtStrategyResponse } from '../auth/interfaces/jwt-strategy-response';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findMe(@Request() { user }: { user: JwtStrategyResponse }) {
    return this.usersService.findMe(user);
  }
}
