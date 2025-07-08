import { Type } from "class-transformer";
import { IsArray, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { MultiLangTextDto } from "./multiLangText.dto";

export class SubSectionDto {
  @IsObject()
  @ValidateNested()
  @Type(() => MultiLangTextDto)
  title: MultiLangTextDto;

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