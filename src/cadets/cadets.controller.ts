import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CadetsService } from './cadets.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCadetDto } from './dto/create-cadet.dto';
import { CadetDto } from './dto/cadet.dto';

@ApiTags('Cadets API')
@ApiBearerAuth()
@Controller('cadets')
export class CadetsController {
  constructor(private cadetService: CadetsService) {}

  @Post('cadet')
  @ApiOperation({ summary: 'Create cadets' })
  async createCadet(
    @Res() response,
    @Body() cadet: CreateCadetDto,
  ): Promise<CadetDto> {
    const result = await this.cadetService.createCadet(cadet);
    return response.status(HttpStatus.CREATED).json({ result });
  }

  @Get()
  @ApiOperation({ summary: 'Get all cadets' })
  async getCadets(@Res() response) {
    const cadets = await this.cadetService.getCadets();
    return response.status(HttpStatus.OK).json({ cadets });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cadet' })
  async getCadet(@Res() response, @Param('id') id: string) {
    const cadet = await this.cadetService.getCadet(id);
    return response.status(HttpStatus.OK).json({ cadet });
  }
}
