import { IsObject, IsOptional, ValidateNested } from "class-validator";
import { MultiLangTextDto } from "./multiLangText.dto";
import { Type } from "class-transformer";

export class SummaryDto {
  @IsObject()
  @ValidateNested()
  @Type(() => MultiLangTextDto)
  column1: MultiLangTextDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => MultiLangTextDto)
  column2?: MultiLangTextDto;
}