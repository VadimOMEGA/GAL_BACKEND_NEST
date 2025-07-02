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
exports.SectionDto = void 0;
const class_validator_1 = require("class-validator");
const multiLangText_dto_1 = require("./multiLangText.dto");
const class_transformer_1 = require("class-transformer");
const subSection_dto_1 = require("./subSection.dto");
class SectionDto {
    title;
    subsections;
}
exports.SectionDto = SectionDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => multiLangText_dto_1.MultiLangTextDto),
    __metadata("design:type", multiLangText_dto_1.MultiLangTextDto)
], SectionDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'At least one subsection is required' }),
    (0, class_transformer_1.Type)(() => subSection_dto_1.SubSectionDto),
    __metadata("design:type", Array)
], SectionDto.prototype, "subsections", void 0);
//# sourceMappingURL=section.dto.js.map