import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
export declare class AuthService {
    private jwt;
    private adminService;
    REFRESH_TOKEN_NAME: string;
    EXPIRE_DAY_REFRESH_TOKEN: number;
    constructor(jwt: JwtService, adminService: AdminService);
    login(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        admin: {
            username: string;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
    register(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        admin: {
            username: string;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
    getNewTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        admin: {
            username: string;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
    private issueTokens;
    private validateAdmin;
    addRefreshTokenToResponse(res: Response, refreshToken: string): void;
    removeRefreshTokenFromResponse(res: Response): void;
}
