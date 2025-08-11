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
exports.StatisticsSchema = exports.Statistics = exports.ExecutiveMember = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const text_schema_1 = require("./shared/text.schema");
let ExecutiveMember = class ExecutiveMember {
    image;
    name;
    position;
};
exports.ExecutiveMember = ExecutiveMember;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ExecutiveMember.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], ExecutiveMember.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], ExecutiveMember.prototype, "position", void 0);
exports.ExecutiveMember = ExecutiveMember = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ExecutiveMember);
let Statistics = class Statistics {
    title;
    image;
    projects_number;
    activity_years;
    population;
    total_members;
    total_added_members;
    business_members;
    public_members;
    civic_members;
    executive_members;
};
exports.Statistics = Statistics;
__decorate([
    (0, mongoose_1.Prop)({ type: text_schema_1.MultiLangText, required: true }),
    __metadata("design:type", text_schema_1.MultiLangText)
], Statistics.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Statistics.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Statistics.prototype, "projects_number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Statistics.prototype, "activity_years", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Statistics.prototype, "population", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Statistics.prototype, "total_members", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Statistics.prototype, "total_added_members", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Statistics.prototype, "business_members", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Statistics.prototype, "public_members", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Statistics.prototype, "civic_members", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [ExecutiveMember], required: true }),
    __metadata("design:type", Array)
], Statistics.prototype, "executive_members", void 0);
exports.Statistics = Statistics = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'statistics' })
], Statistics);
exports.StatisticsSchema = mongoose_1.SchemaFactory.createForClass(Statistics);
//# sourceMappingURL=statistics.schema.js.map