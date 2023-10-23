import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CadetsService } from './cadets.service';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCadetDto } from './dto/create-cadet.dto';
import { CadetDto } from './dto/cadet.dto';
import { Cadet } from './cadets.schema';
import { AuthGuard } from 'src/guards/jwtAuth.guard';

@ApiTags('Cadets API')
@ApiBearerAuth()
@Controller('cadets')
export class CadetsController {
  constructor(private cadetService: CadetsService) {}

  @Post('cadet')
  @ApiOperation({ summary: 'Create cadets' })
  @UseGuards(AuthGuard)
  async createCadet(
    @Body() cadet: CreateCadetDto,
  ): Promise<Cadet> {
    return await this.cadetService.createCadet(cadet);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cadets' })
  @UseGuards(AuthGuard)
  async getCadets() {
    return await this.cadetService.getCadets();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cadet' })
  @UseGuards(AuthGuard)
  async getCadet(@Res() response, @Param('id') id: string) {
    const cadet = await this.cadetService.getCadet(id);
    return response.status(HttpStatus.OK).json({ cadet });
  }
}
