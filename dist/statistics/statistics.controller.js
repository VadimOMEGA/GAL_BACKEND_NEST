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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsController = void 0;
const common_1 = require("@nestjs/common");
const statistics_service_1 = require("./statistics.service");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const statistics_dto_1 = require("./dto/statistics.dto");
const update_statistics_dto_1 = require("./dto/update-statistics.dto");
const swagger_1 = require("@nestjs/swagger");
const swagger_decorators_1 = require("./decorators/swagger.decorators");
let StatisticsController = class StatisticsController {
    statisticsService;
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    async getStatistics() {
        return this.statisticsService.getStatistics();
    }
    async updateStatistics(dto) {
        return this.statisticsService.updateStatistics(dto);
    }
    async initializeStatistics(dto) {
        return this.statisticsService.initializeStatistics(dto);
    }
};
exports.StatisticsController = StatisticsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_decorators_1.SwaggerGetStatistics)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_decorators_1.SwaggerUpdateStatistics)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true, skipMissingProperties: false })),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_statistics_dto_1.UpdateStatisticsDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "updateStatistics", null);
__decorate([
    (0, common_1.Post)('initialize'),
    (0, swagger_decorators_1.SwaggerInitializeStatistics)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true, skipMissingProperties: false })),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [statistics_dto_1.StatisticsDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "initializeStatistics", null);
exports.StatisticsController = StatisticsController = __decorate([
    (0, swagger_1.ApiTags)('📊 Statistics'),
    (0, common_1.Controller)('statistics'),
    __metadata("design:paramtypes", [statistics_service_1.StatisticsService])
], StatisticsController);
//# sourceMappingURL=statistics.controller.js.map