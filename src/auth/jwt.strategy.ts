import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AdminService } from "src/admin/admin.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private adminService: AdminService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get<string>("JWT_SECRET") || "49)@',5BKi~W",
        })
    }

    async validate({ id } : { id : string }) {
        const adminDoc = await this.adminService.getById(id);
        if (!adminDoc) return null;
        return adminDoc.toObject();
    }
}