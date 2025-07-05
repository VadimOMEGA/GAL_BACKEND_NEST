import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEnum, IsObject, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { SectionDto } from "./section.dto";
import { SummaryDto } from "./summary.dto";
import { AuthenticLocalCategoriesEnum, BlogsCategoriesEnum, BlogsContentTypeEnum } from "src/enums/blog.enum";
import { MultiLangTextDto } from "./multiLangText.dto";

export class BlogDto {

  @IsObject()
  @ValidateNested()
  @Type(() => MultiLangTextDto)
  title: MultiLangTextDto;

  @IsEnum(BlogsContentTypeEnum)
  content_type: BlogsContentTypeEnum;

  @IsArray()
  @IsEnum(BlogsCategoriesEnum, { each: true })
  categories: BlogsCategoriesEnum[];

  @IsOptional()
  @IsEnum(AuthenticLocalCategoriesEnum)
  authentic_local_category: AuthenticLocalCategoriesEnum;

  @IsString()
  @MinLength(1)
  main_image: string;

  @IsObject()
  @ValidateNested()
  @Type(() => SummaryDto)
  summary: SummaryDto;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one section is required' })
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  sections: SectionDto[];
}