import { SectionDto } from "./section.dto";
import { SummaryDto } from "./summary.dto";
import { AuthenticLocalCategoriesEnum, BlogsCategoriesEnum, BlogsContentTypeEnum } from "src/enums/blog.enum";
import { MultiLangTextDto } from "./multiLangText.dto";
export declare class BlogDto {
    title: MultiLangTextDto;
    content_type: BlogsContentTypeEnum;
    categories: BlogsCategoriesEnum[];
    authentic_local_category: AuthenticLocalCategoriesEnum;
    main_image: string;
    summary: SummaryDto;
    sections: SectionDto[];
}
