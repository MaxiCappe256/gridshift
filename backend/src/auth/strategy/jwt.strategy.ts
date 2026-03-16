import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET!,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const { id } = payload;

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new UnauthorizedException('Token invalido');

    if (!user.isActive) throw new UnauthorizedException('Usuario inactivo');

    return user;
  }
}
