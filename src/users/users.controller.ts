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

@ApiTags('Users API')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @UseGuards(AuthGuard)
  async getUsers(@Res() response): Promise<string> {
    const users = await this.userService.getUsers();
    return response.status(HttpStatus.OK).json({ users });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Accept terms and conditions' })
  @UseGuards(AuthGuard)
  async acceptTermsAndConditions(@Res() response, @Param('id') id: string) {
    const acceptTermsAndConditions =
      await this.userService.acceptTermsAndConditions(id);
    return response.status(HttpStatus.OK).json({ acceptTermsAndConditions });
  }
}
