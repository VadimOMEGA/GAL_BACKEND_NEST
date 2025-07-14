import { HydratedDocument } from "mongoose";
import { MultiLangText } from "./shared/text.schema";
export type DocumentsDocument = HydratedDocument<Documents>;
export declare class Regulations {
    text: MultiLangText;
    file: string;
}
export declare class Statuses {
    text: MultiLangText;
    file: string;
}
export declare class Strategies {
    text: MultiLangText;
    file: string;
}
export declare class Agreements {
    text: MultiLangText;
    file: string;
}
export declare class Reports {
    text: MultiLangText;
    file: string;
}
export declare class Documents {
    main_image: string;
    regulations: Regulations[];
    statuses: Statuses[];
    strategies: Strategies[];
    agreements: Agreements[];
    reports: Reports[];
}
export declare const DocumentsSchema: import("mongoose").Schema<Documents, import("mongoose").Model<Documents, any, any, any, import("mongoose").Document<unknown, any, Documents, any> & Documents & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Documents, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Documents>, {}> & import("mongoose").FlatRecord<Documents> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
