import { ManagementService } from './management.service';
import { UpdateManagementDto } from './dto/update-management.dto';
import { ManagementDto } from './dto/management.dto';
export declare class ManagementController {
    private readonly managementService;
    constructor(managementService: ManagementService);
    getManagement(): Promise<import("mongoose").Document<unknown, {}, import("../schemas/management.schema").Management, {}> & import("../schemas/management.schema").Management & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateManagement(dto: UpdateManagementDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/management.schema").Management, {}> & import("../schemas/management.schema").Management & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    initializeManagement(dto: ManagementDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/management.schema").Management, {}> & import("../schemas/management.schema").Management & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
