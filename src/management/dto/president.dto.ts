import { Type } from "class-transformer"
import { IsObject, IsString, ValidateIf, ValidateNested } from "class-validator"
import { MultiLangTextDto } from "src/blogs/dto/multiLangText.dto"

export class PresidentDto {
  @IsObject()
  @ValidateNested()
  @Type(() => MultiLangTextDto)
  text: MultiLangTextDto

  @IsString()
  @ValidateIf((o, value) =>  value !== '')
  image: string
}