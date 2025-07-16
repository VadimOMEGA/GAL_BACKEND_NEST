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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const documents_service_1 = require("./documents.service");
const swagger_1 = require("@nestjs/swagger");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const documents_update_dto_1 = require("./dto/documents-update.dto");
const documents_dto_1 = require("./dto/documents.dto");
const delete_pdf_dto_1 = require("./dto/delete-pdf.dto");
let DocumentsController = class DocumentsController {
    documentsService;
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    async getDocuments() {
        return this.documentsService.getDocuments();
    }
    async updateDocuments(dto) {
        return this.documentsService.updateDocuments(dto);
    }
    async initializeDocuments(dto) {
        return this.documentsService.initializeDocuments(dto);
    }
    async generateImageUploadLink() {
        return this.documentsService.generateFileUploadLink();
    }
    async deleteDocumentFiles(dto) {
        return this.documentsService.deleteDocuments(dto.fileUrls);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getDocuments", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
        whitelist: true,
        skipMissingProperties: false
    })),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [documents_update_dto_1.UpdateDocumentsDto]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "updateDocuments", null);
__decorate([
    (0, common_1.Post)('initialize'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
        whitelist: true,
        skipMissingProperties: false
    })),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [documents_dto_1.DocumentsDto]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "initializeDocuments", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/generate-upload-link'),
    (0, auth_decorator_1.Auth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "generateImageUploadLink", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('delete-files'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_pdf_dto_1.DeleteFilesDto]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "deleteDocumentFiles", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, swagger_1.ApiTags)('📄 Documents'),
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map