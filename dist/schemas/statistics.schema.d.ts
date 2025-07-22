import { HydratedDocument } from 'mongoose';
import { MultiLangText } from './shared/text.schema';
export type StatisticsDocument = HydratedDocument<Statistics>;
export declare class Statistics {
    title: MultiLangText;
    image: string;
    projects_number: number;
    activity_years: number;
    population: number;
    total_members: number;
    total_added_members: number;
    business_members: number;
    public_members: number;
    civic_members: number;
}
export declare const StatisticsSchema: import("mongoose").Schema<Statistics, import("mongoose").Model<Statistics, any, any, any, import("mongoose").Document<unknown, any, Statistics, any> & Statistics & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Statistics, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Statistics>, {}> & import("mongoose").FlatRecord<Statistics> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
