import { StatisticsService } from './statistics.service';
import { StatisticsDto } from './dto/statistics.dto';
import { UpdateStatisticsDto } from './dto/update-statistics.dto';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getStatistics(): Promise<import("mongoose").Document<unknown, {}, import("../schemas/statistics.schema").Statistics, {}> & import("../schemas/statistics.schema").Statistics & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateStatistics(dto: UpdateStatisticsDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/statistics.schema").Statistics, {}> & import("../schemas/statistics.schema").Statistics & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    initializeStatistics(dto: StatisticsDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/statistics.schema").Statistics, {}> & import("../schemas/statistics.schema").Statistics & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
