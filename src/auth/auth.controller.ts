import { Controller, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login( @Body() auth: AuthDto) {
    return await this.authService.login(auth);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create users' })
  async signup( @Body() user: CreateUserDto) {
    return await this.authService.signUp(user);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  async logout() {}
}
