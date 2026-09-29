import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LogoutDto {
  @ApiPropertyOptional({
    description: 'Mobile refresh token. Browser clients use the cookie.',
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
