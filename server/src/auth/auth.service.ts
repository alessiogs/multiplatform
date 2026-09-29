import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RefreshToken } from '../users/entities/refresh-token';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokensRepository: Repository<RefreshToken>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmailForAuth(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const { accessToken, accessTokenExp, refreshToken, refreshTokenExp } =
      this.generateTokens(user);

    await this.refreshTokensRepository.delete({ user: { id: user.id } });

    await this.refreshTokensRepository.save({
      token: await bcrypt.hash(refreshToken, 12),
      user,
    });

    return { accessToken, accessTokenExp, refreshToken, refreshTokenExp };
  }

  async register(dto: CreateUserDto) {
    const user = await this.usersService.create(dto);

    return user;
  }

  async refreshSession(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      await this.jwtService.verifyAsync(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const storedToken = await this.findStoredToken(refreshToken);

    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const {
      accessToken,
      accessTokenExp,
      refreshToken: newRefreshToken,
      refreshTokenExp,
    } = this.generateTokens(storedToken.user);

    await this.refreshTokensRepository.remove(storedToken);

    await this.refreshTokensRepository.save({
      token: await bcrypt.hash(newRefreshToken, 12),
      user: storedToken.user,
    });

    return {
      accessToken,
      accessTokenExp,
      refreshToken: newRefreshToken,
      refreshTokenExp,
    };
  }

  async logout(refreshToken?: string) {
    if (!refreshToken) {
      return;
    }

    const storedToken = await this.findStoredToken(refreshToken);
    if (storedToken) {
      await this.refreshTokensRepository.remove(storedToken);
    }
  }

  private async findStoredToken(refreshToken: string) {
    const storedTokens = await this.refreshTokensRepository.find({
      relations: {
        user: true,
      },
    });

    for (const candidate of storedTokens) {
      if (await bcrypt.compare(refreshToken, candidate.token)) {
        return candidate;
      }
    }

    return undefined;
  }

  private generateTokens(user: User) {
    const payload = { email: user.email, sub: user.id };

    const accessToken = this.jwtService.sign(payload);
    const { exp: accessTokenExp } = this.jwtService.decode(accessToken);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    const { exp: refreshTokenExp } = this.jwtService.decode(refreshToken);

    return { accessToken, accessTokenExp, refreshToken, refreshTokenExp };
  }
}
