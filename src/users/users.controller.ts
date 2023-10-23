import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/jwtAuth.guard';
import { User } from './users.schema';


@ApiTags('Users API')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @UseGuards(AuthGuard)
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Accept terms and conditions' })
  @UseGuards(AuthGuard)
  async acceptTermsAndConditions( @Param('id') id: string) {
    return await this.userService.acceptTermsAndConditions(id);
  }
}
