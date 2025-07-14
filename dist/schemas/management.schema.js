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
exports.ManagementSchema = exports.Management = exports.Censorship = exports.Committee = exports.Administration = exports.GeneralAssembly = exports.Executive = exports.President = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const text_schema_1 = require("./shared/text.schema");
let President = class President {
    text;
    image;
};
exports.President = President;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], President.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, default: '' }),
    __metadata("design:type", String)
], President.prototype, "image", void 0);
exports.President = President = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], President);
let Executive = class Executive {
    column1;
    column2;
};
exports.Executive = Executive;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Executive.prototype, "column1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: false, default: '' }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Executive.prototype, "column2", void 0);
exports.Executive = Executive = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Executive);
let GeneralAssembly = class GeneralAssembly {
    column1;
    column2;
};
exports.GeneralAssembly = GeneralAssembly;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], GeneralAssembly.prototype, "column1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: false, default: '' }),
    __metadata("design:type", text_schema_1.MultiLangText)
], GeneralAssembly.prototype, "column2", void 0);
exports.GeneralAssembly = GeneralAssembly = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], GeneralAssembly);
let Administration = class Administration {
    column1;
    column2;
};
exports.Administration = Administration;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Administration.prototype, "column1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: false, default: '' }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Administration.prototype, "column2", void 0);
exports.Administration = Administration = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Administration);
let Committee = class Committee {
    column1;
    column2;
};
exports.Committee = Committee;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Committee.prototype, "column1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: false, default: '' }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Committee.prototype, "column2", void 0);
exports.Committee = Committee = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Committee);
let Censorship = class Censorship {
    column1;
    column2;
};
exports.Censorship = Censorship;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Censorship.prototype, "column1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: false, default: '' }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Censorship.prototype, "column2", void 0);
exports.Censorship = Censorship = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Censorship);
let Management = class Management {
    main_image;
    president;
    executive;
    general_assembly;
    administration;
    committee;
    censorship;
};
exports.Management = Management;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, default: '' }),
    __metadata("design:type", String)
], Management.prototype, "main_image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: President, required: true }),
    __metadata("design:type", President)
], Management.prototype, "president", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Executive, required: true }),
    __metadata("design:type", Executive)
], Management.prototype, "executive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: GeneralAssembly, required: true }),
    __metadata("design:type", GeneralAssembly)
], Management.prototype, "general_assembly", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Administration, required: true }),
    __metadata("design:type", Administration)
], Management.prototype, "administration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Committee, required: true }),
    __metadata("design:type", Committee)
], Management.prototype, "committee", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Censorship, required: true }),
    __metadata("design:type", Censorship)
], Management.prototype, "censorship", void 0);
exports.Management = Management = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'management' })
], Management);
exports.ManagementSchema = mongoose_1.SchemaFactory.createForClass(Management);
//# sourceMappingURL=management.schema.js.map