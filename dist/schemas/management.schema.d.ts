import { HydratedDocument } from 'mongoose';
import { MultiLangText } from './shared/text.schema';
export type ManagementDocument = HydratedDocument<Management>;
export declare class President {
    text: MultiLangText;
    image: string;
}
export declare class Executive {
    column1: MultiLangText;
    column2?: MultiLangText;
}
export declare class GeneralAssembly {
    column1: MultiLangText;
    column2?: MultiLangText;
}
export declare class Administration {
    column1: MultiLangText;
    column2?: MultiLangText;
}
export declare class Committee {
    column1: MultiLangText;
    column2?: MultiLangText;
}
export declare class Censorship {
    column1: MultiLangText;
    column2?: MultiLangText;
}
export declare class Management {
    main_image: string;
    president: President;
    executive: Executive;
    general_assembly: GeneralAssembly;
    administration: Administration;
    committee: Committee;
    censorship: Censorship;
}
export declare const ManagementSchema: import("mongoose").Schema<Management, import("mongoose").Model<Management, any, any, any, import("mongoose").Document<unknown, any, Management, any> & Management & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Management, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Management>, {}> & import("mongoose").FlatRecord<Management> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
