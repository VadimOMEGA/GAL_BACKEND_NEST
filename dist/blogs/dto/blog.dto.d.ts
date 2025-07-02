import { SectionDto } from "./section.dto";
import { SummaryDto } from "./summary.dto";
import { BlogsCategoriesEnum, BlogsContentTypeEnum } from "src/enums/blog.enum";
import { MultiLangTextDto } from "./multiLangText.dto";
export declare class BlogDto {
    title: MultiLangTextDto;
    content_type: BlogsContentTypeEnum;
    categories: BlogsCategoriesEnum[];
    main_image: string;
    summary: SummaryDto;
    sections: SectionDto[];
}
