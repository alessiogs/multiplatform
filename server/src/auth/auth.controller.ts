import {
  Body,
  Controller,
  Cookies,
  Post,
  Res,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import type { Response, Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

const REFRESH_TOKEN_COOKIE = 'refreshToken';
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() { user }: ExpressRequest & { user: User },
    @Res({ passthrough: true }) response: Response,
  ) {
    const session = await this.authService.login(user);
    this.setRefreshTokenCookie(response, session.refreshToken);

    const { refreshToken: _, ...webSession } = session;
    return webSession;
  }

  @UseGuards(LocalAuthGuard)
  @Post('mobile/login')
  loginMobile(@Request() { user }: ExpressRequest & { user: User }) {
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body(ValidationPipe) dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('refresh')
  async refreshSession(
    @Cookies(REFRESH_TOKEN_COOKIE) refreshToken: string | undefined,
    @Res({ passthrough: true }) response: Response,
  ) {
    const session = await this.authService.refreshSession(refreshToken);
    this.setRefreshTokenCookie(response, session.refreshToken);

    const { refreshToken: _, ...webSession } = session;
    return webSession;
  }

  @Post('mobile/refresh')
  refreshMobile(@Body(ValidationPipe) { refreshToken }: RefreshTokenDto) {
    return this.authService.refreshSession(refreshToken);
  }

  private setRefreshTokenCookie(response: Response, refreshToken: string) {
    response.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_MAX_AGE,
      path: '/auth',
    });
  }
}
