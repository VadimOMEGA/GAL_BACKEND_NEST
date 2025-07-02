import { IsString } from "class-validator";

export class MultiLangTextDto {
  @IsString()
  ro: string;

  @IsString()
  ru: string;

  @IsString()
  en: string;
}