import { Type } from "class-transformer"
import { IsObject, IsString, ValidateNested } from "class-validator"
import { MultiLangTextDto } from "src/blogs/dto/multiLangText.dto"

export class ExecutiveMemberDto {
	@IsString()
	image: string

	@IsObject()
	@ValidateNested()
	@Type(() => MultiLangTextDto)
	name: MultiLangTextDto

	@IsObject()
	@ValidateNested()
	@Type(() => MultiLangTextDto)
	position: MultiLangTextDto
}
