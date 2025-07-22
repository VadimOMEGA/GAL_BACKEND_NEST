import { Type } from "class-transformer";
import { IsNumber, IsObject, IsString, MinLength, ValidateNested } from "class-validator";
import { MultiLangTextDto } from "src/blogs/dto/multiLangText.dto";

export class StatisticsDto {
  @IsObject()
  @ValidateNested()
  @Type(() => MultiLangTextDto)
  title: MultiLangTextDto;

  @IsString()
  @MinLength(1)
  image: string;

  @IsNumber()
  projects_number: number;

  @IsNumber()
  activity_years: number;

  @IsNumber()
  population: number;

  @IsNumber()
  total_members: number;

  @IsNumber()
  total_added_members: number;

  @IsNumber()
  business_members: number;

  @IsNumber()
  public_members: number;

  @IsNumber()
  civic_members: number;
}