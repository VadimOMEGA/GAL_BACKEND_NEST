import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    updateAdmin(id: string, dto: AdminDto): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/admin.schema").Admin, {}> & import("../schemas/admin.schema").Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
