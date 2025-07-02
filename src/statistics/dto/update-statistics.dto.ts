import { PartialType } from '@nestjs/mapped-types';
import { StatisticsDto } from "./statistics.dto";

export class UpdateStatisticsDto extends PartialType(StatisticsDto) {}