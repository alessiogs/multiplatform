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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List users' })
  findAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the current user' })
  async findMe(@Request() { user }: { user: JwtStrategyResponse }) {
    return this.usersService.findMe(user);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a user' })
  removeUser(@Query('id') id: string) {
    return this.usersService.remove(id);
  }
}
