import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: AuthDto, res: Response): Promise<{
        accessToken: string;
        admin: {
            username: string;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
    getNewTokens(req: Request, res: Response): Promise<{
        accessToken: string;
        admin: {
            username: string;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
}
