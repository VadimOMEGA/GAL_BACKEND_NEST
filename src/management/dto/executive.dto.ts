import { Type } from 'class-transformer'
import { IsObject, IsOptional, ValidateNested } from 'class-validator'
import { MultiLangTextDto } from 'src/blogs/dto/multiLangText.dto'

export class ExecutiveDto {
	@IsObject()
	@ValidateNested()
	@Type(() => MultiLangTextDto)
	column1: MultiLangTextDto

	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => MultiLangTextDto)
	column2?: MultiLangTextDto
}
