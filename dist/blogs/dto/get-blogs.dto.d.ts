import { BlogsCategoriesEnum, BlogsContentTypeEnum } from "src/enums/blog.enum";
export declare class GetBlogsDto {
    page?: number;
    limit?: number;
    q?: string;
    content_type?: BlogsContentTypeEnum;
    category?: BlogsCategoriesEnum;
}
