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
exports.BlogDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const section_dto_1 = require("./section.dto");
const summary_dto_1 = require("./summary.dto");
const blog_enum_1 = require("../../enums/blog.enum");
const multiLangText_dto_1 = require("./multiLangText.dto");
class BlogDto {
    title;
    content_type;
    categories;
    authentic_local_category;
    main_image;
    summary;
    sections;
}
exports.BlogDto = BlogDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => multiLangText_dto_1.MultiLangTextDto),
    __metadata("design:type", multiLangText_dto_1.MultiLangTextDto)
], BlogDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(blog_enum_1.BlogsContentTypeEnum),
    __metadata("design:type", String)
], BlogDto.prototype, "content_type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(blog_enum_1.BlogsCategoriesEnum, { each: true }),
    __metadata("design:type", Array)
], BlogDto.prototype, "categories", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(blog_enum_1.AuthenticLocalCategoriesEnum),
    __metadata("design:type", String)
], BlogDto.prototype, "authentic_local_category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], BlogDto.prototype, "main_image", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => summary_dto_1.SummaryDto),
    __metadata("design:type", summary_dto_1.SummaryDto)
], BlogDto.prototype, "summary", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'At least one section is required' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => section_dto_1.SectionDto),
    __metadata("design:type", Array)
], BlogDto.prototype, "sections", void 0);
//# sourceMappingURL=blog.dto.js.map