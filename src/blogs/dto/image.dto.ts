import { IsString } from "class-validator";

export class ImageDto {
  @IsString()
  url: string;
}