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
exports.BlogSchema = exports.Blog = exports.Section = exports.SubSection = exports.Summary = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const blog_enum_1 = require("../enums/blog.enum");
const text_schema_1 = require("./shared/text.schema");
let Summary = class Summary {
    column1;
    column2;
};
exports.Summary = Summary;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Summary.prototype, "column1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: false }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Summary.prototype, "column2", void 0);
exports.Summary = Summary = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Summary);
let SubSection = class SubSection {
    title;
    column1;
    column2;
    images;
};
exports.SubSection = SubSection;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], SubSection.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], SubSection.prototype, "column1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: false }),
    __metadata("design:type", text_schema_1.MultiLangText)
], SubSection.prototype, "column2", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: false }),
    __metadata("design:type", Array)
], SubSection.prototype, "images", void 0);
exports.SubSection = SubSection = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], SubSection);
let Section = class Section {
    title;
    subsections;
};
exports.Section = Section;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Section.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [SubSection], required: true }),
    __metadata("design:type", Array)
], Section.prototype, "subsections", void 0);
exports.Section = Section = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Section);
let Blog = class Blog {
    title;
    content_type;
    categories;
    main_image;
    summary;
    sections;
};
exports.Blog = Blog;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Blog.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: blog_enum_1.BlogsContentTypeEnum, required: true }),
    __metadata("design:type", String)
], Blog.prototype, "content_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], enum: blog_enum_1.BlogsCategoriesEnum, required: true }),
    __metadata("design:type", Array)
], Blog.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Blog.prototype, "main_image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Summary, required: true }),
    __metadata("design:type", Summary)
], Blog.prototype, "summary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Section], required: true }),
    __metadata("design:type", Array)
], Blog.prototype, "sections", void 0);
exports.Blog = Blog = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Blog);
exports.BlogSchema = mongoose_1.SchemaFactory.createForClass(Blog);
//# sourceMappingURL=blog.schema.js.map