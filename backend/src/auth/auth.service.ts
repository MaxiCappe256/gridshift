import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

console.log(bcrypt.hashSync('Merli6435', 10));

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new UnauthorizedException('Credenciales invalidas');

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Credenciales invalidas');

    delete (user as any).password;

    const token = this.jwtService.sign({ id: user.id });

    return {
      ...user,
      token,
    };
  }
}
