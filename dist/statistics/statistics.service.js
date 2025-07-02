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
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const statistics_schema_1 = require("../schemas/statistics.schema");
let StatisticsService = class StatisticsService {
    statisticsModel;
    constructor(statisticsModel) {
        this.statisticsModel = statisticsModel;
    }
    async getStatistics() {
        const statistics = await this.statisticsModel.findOne().exec();
        if (!statistics) {
            throw new common_1.NotFoundException('Statistics not found');
        }
        return statistics.toObject();
    }
    async updateStatistics(dto) {
        if (!dto || Object.keys(dto).length === 0)
            throw new common_1.BadRequestException('No data provided');
        const statistics = await this.statisticsModel
            .findOneAndUpdate({}, dto, {
            new: true,
            upsert: true,
            runValidators: true
        })
            .exec();
        return statistics.toObject();
    }
    async initializeStatistics(dto) {
        const existingStatistics = await this.statisticsModel.findOne().exec();
        if (existingStatistics) {
            throw new common_1.BadRequestException('Statistics already exist. Use update instead.');
        }
        const statistics = await this.statisticsModel.create(dto);
        return statistics.toObject();
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(statistics_schema_1.Statistics.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map