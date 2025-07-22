import { HydratedDocument } from 'mongoose';
import { AuthenticLocalCategoriesEnum, BlogsCategoriesEnum, BlogsContentTypeEnum } from 'src/enums/blog.enum';
import { MultiLangText } from './shared/text.schema';
export type BlogDocument = HydratedDocument<Blog>;
export declare class Image {
    url: string;
}
export declare class Summary {
    column1: MultiLangText;
    column2: MultiLangText;
}
export declare class SubSection {
    title: MultiLangText;
    column1: MultiLangText;
    column2: MultiLangText;
    images: Image[];
}
export declare class Section {
    title: MultiLangText;
    subsections: SubSection[];
}
export declare class Blog {
    title: MultiLangText;
    content_type: BlogsContentTypeEnum;
    categories: BlogsCategoriesEnum[];
    authentic_local_category?: AuthenticLocalCategoriesEnum;
    main_image: string;
    summary: Summary;
    sections: Section[];
}
export declare const BlogSchema: import("mongoose").Schema<Blog, import("mongoose").Model<Blog, any, any, any, import("mongoose").Document<unknown, any, Blog, any> & Blog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Blog, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Blog>, {}> & import("mongoose").FlatRecord<Blog> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
