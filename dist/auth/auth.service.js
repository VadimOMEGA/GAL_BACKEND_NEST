"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const admin_service_1 = require("../admin/admin.service");
const argon2_1 = require("argon2");
let AuthService = class AuthService {
    jwt;
    adminService;
    REFRESH_TOKEN_NAME = 'refreshToken';
    EXPIRE_DAY_REFRESH_TOKEN = 1;
    constructor(jwt, adminService) {
        this.jwt = jwt;
        this.adminService = adminService;
    }
    async login(dto) {
        const { password, ...admin } = (await this.validateAdmin(dto)).toObject();
        const tokens = this.issueTokens(admin._id.toString());
        return {
            admin,
            ...tokens
        };
    }
    async register(dto) {
        const oldAdmin = await this.adminService.getByUsername(dto.username);
        if (oldAdmin)
            throw new common_1.BadRequestException('User already exists');
        const { password, ...admin } = (await this.adminService.create(dto)).toObject();
        const tokens = this.issueTokens(admin._id.toString());
        return {
            admin,
            ...tokens
        };
    }
    async getNewTokens(refreshToken) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const adminDoc = await this.adminService.getById(result.id);
        if (!adminDoc)
            throw new common_1.BadRequestException('Admin not found');
        const { password, ...admin } = adminDoc.toObject();
        const tokens = this.issueTokens(admin._id.toString());
        return { admin, ...tokens };
    }
    issueTokens(adminId) {
        const data = { id: adminId };
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        });
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        });
        return { accessToken, refreshToken };
    }
    async validateAdmin(dto) {
        const admin = await this.adminService.getByUsername(dto.username);
        if (!admin)
            throw new common_1.NotFoundException('User not found');
        const isValid = await (0, argon2_1.verify)(admin.password, dto.password);
        if (!isValid)
            throw new common_1.UnauthorizedException('Invalid password');
        return admin;
    }
    addRefreshTokenToResponse(res, refreshToken) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            expires: expiresIn,
            secure: true,
            sameSite: 'none'
        });
    }
    removeRefreshTokenFromResponse(res) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            expires: new Date(0),
            secure: true,
            sameSite: 'none'
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        admin_service_1.AdminService])
], AuthService);
//# sourceMappingURL=auth.service.js.map