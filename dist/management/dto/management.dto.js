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
exports.ManagementDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const president_dto_1 = require("./president.dto");
const committee_dto_1 = require("./committee.dto");
const executive_dto_1 = require("./executive.dto");
const general_assembly_dto_1 = require("./general-assembly.dto");
const administration_dto_1 = require("./administration.dto");
const censorship_dto_1 = require("./censorship.dto");
class ManagementDto {
    main_image;
    president;
    executive;
    general_assembly;
    administration;
    committee;
    censorship;
}
exports.ManagementDto = ManagementDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ManagementDto.prototype, "main_image", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => president_dto_1.PresidentDto),
    __metadata("design:type", president_dto_1.PresidentDto)
], ManagementDto.prototype, "president", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => executive_dto_1.ExecutiveDto),
    __metadata("design:type", executive_dto_1.ExecutiveDto)
], ManagementDto.prototype, "executive", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => general_assembly_dto_1.GeneralAssemblyDto),
    __metadata("design:type", general_assembly_dto_1.GeneralAssemblyDto)
], ManagementDto.prototype, "general_assembly", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => administration_dto_1.AdministrationDto),
    __metadata("design:type", administration_dto_1.AdministrationDto)
], ManagementDto.prototype, "administration", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => committee_dto_1.CommitteeDto),
    __metadata("design:type", committee_dto_1.CommitteeDto)
], ManagementDto.prototype, "committee", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => censorship_dto_1.CensorshipDto),
    __metadata("design:type", censorship_dto_1.CensorshipDto)
], ManagementDto.prototype, "censorship", void 0);
//# sourceMappingURL=management.dto.js.map