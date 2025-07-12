import { Type } from "class-transformer";
import { IsObject, IsString, MinLength, ValidateNested } from "class-validator";
import { MultiLangTextDto } from "src/blogs/dto/multiLangText.dto";

export class StatisticsDto {
  @IsObject()
  @ValidateNested()
  @Type(() => MultiLangTextDto)
  title: MultiLangTextDto;

  @IsString()
  @MinLength(1)
  image: string;

  @IsString()
  @MinLength(1)
  projects_number: string;

  @IsString()
  @MinLength(1)
  activity_years: string;

  @IsString()
  @MinLength(1)
  population: string;

  @IsString()
  @MinLength(1)
  total_members: string;

  @IsString()
  @MinLength(1)
  total_added_members: string;

  @IsString()
  @MinLength(1)
  business_members: string;

  @IsString()
  @MinLength(1)
  public_members: string;

  @IsString()
  @MinLength(1)
  civic_members: string;
}