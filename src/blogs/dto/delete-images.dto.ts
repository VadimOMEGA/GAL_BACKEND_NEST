import { IsArray, IsString, IsUrl } from 'class-validator';

export class DeleteImagesDto {
  @IsArray()
  @IsString({ each: true })
  @IsUrl({}, { each: true })
  imageUrls: string[];
}