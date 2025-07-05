import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { AuthenticLocalCategoriesEnum, BlogsCategoriesEnum, BlogsContentTypeEnum } from "src/enums/blog.enum";

export class GetBlogsDto {
    // Pagination
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(16)
    limit?: number = 12;

    // Filters
    @IsOptional()
    @IsString()
    q?: string;

    @IsOptional()
    @IsEnum(BlogsContentTypeEnum)
    content_type?: BlogsContentTypeEnum;

    @IsOptional()
    @IsEnum(BlogsCategoriesEnum)
    category?: BlogsCategoriesEnum;

    @IsOptional()
    @IsEnum(AuthenticLocalCategoriesEnum)
    authentic_local_category?: AuthenticLocalCategoriesEnum;
}