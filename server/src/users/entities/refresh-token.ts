import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @Column()
  id: string;

  @Column()
  token: string;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;
}
