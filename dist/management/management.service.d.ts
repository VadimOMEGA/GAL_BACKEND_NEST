import { Model } from 'mongoose';
import { Management, ManagementDocument } from 'src/schemas/management.schema';
import { ManagementDto } from './dto/management.dto';
export declare class ManagementService {
    private managementModel;
    constructor(managementModel: Model<ManagementDocument>);
    getManagement(): Promise<import("mongoose").Document<unknown, {}, Management, {}> & Management & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateManagement(dto: Partial<ManagementDto>): Promise<import("mongoose").Document<unknown, {}, Management, {}> & Management & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    initializeManagement(dto: ManagementDto): Promise<import("mongoose").Document<unknown, {}, Management, {}> & Management & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    search(query: string, limit?: number): Promise<any[]>;
}
