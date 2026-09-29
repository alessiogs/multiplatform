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
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

const REFRESH_TOKEN_COOKIE = 'refreshToken';
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Log in through a browser client' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email', example: 'user@example.com' },
        password: { type: 'string', format: 'password', example: 'secret' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Access token returned and refresh token set as a cookie.',
  })
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
  @ApiOperation({ summary: 'Log in through a mobile client' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email', example: 'user@example.com' },
        password: { type: 'string', format: 'password', example: 'secret' },
      },
    },
  })
  loginMobile(@Request() { user }: ExpressRequest & { user: User }) {
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  register(@Body(ValidationPipe) dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh a browser session' })
  @ApiCookieAuth('refreshToken')
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
  @ApiOperation({ summary: 'Refresh a mobile session' })
  refreshMobile(@Body(ValidationPipe) { refreshToken }: RefreshTokenDto) {
    return this.authService.refreshSession(refreshToken);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Log out and revoke the refresh token' })
  @ApiCookieAuth('refreshToken')
  @ApiResponse({
    status: 200,
    description: 'Refresh token revoked and browser cookie cleared.',
  })
  async logout(
    @Cookies(REFRESH_TOKEN_COOKIE) cookieRefreshToken: string | undefined,
    @Body(ValidationPipe) body: LogoutDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(cookieRefreshToken ?? body?.refreshToken);
    response.clearCookie(REFRESH_TOKEN_COOKIE, { path: '/auth' });
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
