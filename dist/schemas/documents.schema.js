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
exports.DocumentsSchema = exports.Documents = exports.Reports = exports.Agreements = exports.Strategies = exports.Statuses = exports.Regulations = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const text_schema_1 = require("./shared/text.schema");
let Regulations = class Regulations {
    text;
    file;
};
exports.Regulations = Regulations;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Regulations.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Regulations.prototype, "file", void 0);
exports.Regulations = Regulations = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Regulations);
let Statuses = class Statuses {
    text;
    file;
};
exports.Statuses = Statuses;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Statuses.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Statuses.prototype, "file", void 0);
exports.Statuses = Statuses = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Statuses);
let Strategies = class Strategies {
    text;
    file;
};
exports.Strategies = Strategies;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Strategies.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Strategies.prototype, "file", void 0);
exports.Strategies = Strategies = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Strategies);
let Agreements = class Agreements {
    text;
    file;
};
exports.Agreements = Agreements;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Agreements.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Agreements.prototype, "file", void 0);
exports.Agreements = Agreements = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Agreements);
let Reports = class Reports {
    text;
    file;
};
exports.Reports = Reports;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Reports.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Reports.prototype, "file", void 0);
exports.Reports = Reports = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Reports);
let Documents = class Documents {
    main_image;
    regulations;
    statuses;
    strategies;
    agreements;
    reports;
};
exports.Documents = Documents;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Documents.prototype, "main_image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Regulations], required: true }),
    __metadata("design:type", Array)
], Documents.prototype, "regulations", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Statuses], required: true }),
    __metadata("design:type", Array)
], Documents.prototype, "statuses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Strategies], required: true }),
    __metadata("design:type", Array)
], Documents.prototype, "strategies", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Agreements], required: true }),
    __metadata("design:type", Array)
], Documents.prototype, "agreements", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Reports], required: true }),
    __metadata("design:type", Array)
], Documents.prototype, "reports", void 0);
exports.Documents = Documents = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'documents' })
], Documents);
exports.DocumentsSchema = mongoose_1.SchemaFactory.createForClass(Documents);
//# sourceMappingURL=documents.schema.js.map