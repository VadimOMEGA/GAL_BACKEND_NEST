import { IsOptional, IsString } from "class-validator";

export class ImageDto {
  @IsString()
  url_1: string;

  @IsOptional()
  @IsString()
  url_2?: string;
}