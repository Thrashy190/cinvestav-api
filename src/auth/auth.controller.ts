import { Controller, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiOperation,ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@ApiTags('Auth API')
@Controller()
export class AuthController {
  constructor(private authService:  AuthService) {}


  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(@Res() response) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create users' })
  async signup(@Res() response,@Body() user: CreateUserDto) {

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

    user.password = hashedPassword;

    const result = await this.authService.signUp(user);
    return response.status(HttpStatus.CREATED).json({ result });
  
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  async logout(@Res() response) {}
}
