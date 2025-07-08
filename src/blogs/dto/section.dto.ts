import { ArrayMinSize, IsArray, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'
import { MultiLangTextDto } from './multiLangText.dto'
import { Type } from 'class-transformer'
import { SubSectionDto } from './subSection.dto'

export class SectionDto {
	@IsObject()
	@ValidateNested()
	@Type(() => MultiLangTextDto)
	title: MultiLangTextDto

	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1, { message: 'At least one subsection is required' })
	@Type(() => SubSectionDto)
	subsections: SubSectionDto[]

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	images?: string[]
}
