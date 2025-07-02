import { Body, Controller, Get, HttpCode, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { StatisticsDto } from './dto/statistics.dto';
import { UpdateStatisticsDto } from './dto/update-statistics.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerGetStatistics, SwaggerInitializeStatistics, SwaggerUpdateStatistics } from './decorators/swagger.decorators';

@ApiTags('📊 Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @SwaggerGetStatistics()
  async getStatistics() {
    return this.statisticsService.getStatistics();
  }

  @Put()
  @SwaggerUpdateStatistics()
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true, skipMissingProperties: false }))
  @HttpCode(200)
  @Auth()
  async updateStatistics(@Body() dto: UpdateStatisticsDto) {
    return this.statisticsService.updateStatistics(dto);
  }

  @Post('initialize')
  @SwaggerInitializeStatistics()
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true, skipMissingProperties: false }))
  @HttpCode(200)
  @Auth()
  async initializeStatistics(@Body() dto : StatisticsDto) {
    return this.statisticsService.initializeStatistics(dto);
  }

}
