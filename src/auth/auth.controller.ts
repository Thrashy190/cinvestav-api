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
  async login(@Res() response, @Body() auth: AuthDto) {
    const result = await this.authService.login(auth);
    return response.status(result.status).json({ result });
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create users' })
  async signup(@Res() response, @Body() user: CreateUserDto) {
    const result = await this.authService.signUp(user);
    return response.status(HttpStatus.CREATED).json({ result });
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  async logout(@Res() response) {}
}
