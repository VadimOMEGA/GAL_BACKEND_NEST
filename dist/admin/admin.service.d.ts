import { Model } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { Admin } from 'src/schemas/admin.schema';
import { AdminDto } from './dto/admin.dto';
export declare class AdminService {
    private adminModel;
    constructor(adminModel: Model<Admin>);
    getById(id: string): Promise<(import("mongoose").Document<unknown, {}, Admin, {}> & Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getByUsername(username: string): Promise<(import("mongoose").Document<unknown, {}, Admin, {}> & Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    create(dto: AuthDto): Promise<import("mongoose").Document<unknown, {}, Admin, {}> & Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, dto: AdminDto): Promise<(import("mongoose").Document<unknown, {}, Admin, {}> & Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
