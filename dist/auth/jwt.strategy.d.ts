import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AdminService } from "src/admin/admin.service";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private adminService;
    constructor(configService: ConfigService, adminService: AdminService);
    validate({ id }: {
        id: string;
    }): Promise<(import("../schemas/admin.schema").Admin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
export {};
