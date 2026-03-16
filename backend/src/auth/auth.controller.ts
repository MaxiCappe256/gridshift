import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    // @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginDto);

    // res.cookie('token', token, {
    //   httpOnly: true,
    //   sameSite: 'none',
    //   secure: true,
    //   maxAge: 1000 * 60 * 60 * 24,
    //   path: '/',
    //   domain: '.vercel.app', // El punto adelante permite que subdominios lo lean
    // });

    // return {
    //   ...user,
    //   token,
    // };
  }

  // @Post('/logout')
  // logout(@Res({ passthrough: true }) res: Response) {
  //   res.clearCookie('token');

  //   return {
  //     message: 'Logout successful',
  //   };
  // }
}
