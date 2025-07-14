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
exports.DocumentsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const regulations_dto_1 = require("./regulations.dto");
const statuses_dto_1 = require("./statuses.dto");
const strategies_dto_1 = require("./strategies.dto");
const agreements_dto_1 = require("./agreements.dto");
const reports_dto_1 = require("./reports.dto");
class DocumentsDto {
    main_image;
    regulations;
    statuses;
    strategies;
    agreements;
    reports;
}
exports.DocumentsDto = DocumentsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocumentsDto.prototype, "main_image", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => regulations_dto_1.RegulationsDto),
    __metadata("design:type", Array)
], DocumentsDto.prototype, "regulations", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => statuses_dto_1.StatusesDto),
    __metadata("design:type", Array)
], DocumentsDto.prototype, "statuses", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => strategies_dto_1.StrategiesDto),
    __metadata("design:type", Array)
], DocumentsDto.prototype, "strategies", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => agreements_dto_1.AgreementsDto),
    __metadata("design:type", Array)
], DocumentsDto.prototype, "agreements", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => reports_dto_1.ReportsDto),
    __metadata("design:type", Array)
], DocumentsDto.prototype, "reports", void 0);
//# sourceMappingURL=documents.dto.js.map