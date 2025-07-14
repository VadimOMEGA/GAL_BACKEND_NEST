import { Type } from 'class-transformer'
import { IsObject, IsString, ValidateNested } from 'class-validator'
import { MultiLangTextDto } from 'src/blogs/dto/multiLangText.dto'

export class StrategiesDto {
	@IsObject()
	@ValidateNested()
	@Type(() => MultiLangTextDto)
	text: MultiLangTextDto

	@IsString()
	file: string
}
