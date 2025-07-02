import { Model } from 'mongoose';
import { Statistics, StatisticsDocument } from 'src/schemas/statistics.schema';
import { StatisticsDto } from './dto/statistics.dto';
export declare class StatisticsService {
    private statisticsModel;
    constructor(statisticsModel: Model<StatisticsDocument>);
    getStatistics(): Promise<import("mongoose").Document<unknown, {}, Statistics, {}> & Statistics & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateStatistics(dto: Partial<StatisticsDto>): Promise<import("mongoose").Document<unknown, {}, Statistics, {}> & Statistics & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    initializeStatistics(dto: StatisticsDto): Promise<import("mongoose").Document<unknown, {}, Statistics, {}> & Statistics & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
