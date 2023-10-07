import { Controller, Res, Get, Post } from '@nestjs/common';

@Controller()
export class AuthController {
  @Post('login')
  async login(@Res() response) {}

  @Post('signup')
  async signup(@Res() response) {}

  @Post('logout')
  async logout(@Res() response) {}
}
