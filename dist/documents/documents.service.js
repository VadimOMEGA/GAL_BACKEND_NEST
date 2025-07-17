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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const documents_schema_1 = require("../schemas/documents.schema");
const aws_service_1 = require("../aws/aws.service");
let DocumentsService = class DocumentsService {
    documentsModel;
    awsService;
    constructor(documentsModel, awsService) {
        this.documentsModel = documentsModel;
        this.awsService = awsService;
    }
    async getDocuments() {
        const documents = await this.documentsModel.findOne().exec();
        if (!documents) {
            throw new common_1.NotFoundException('Documents not found');
        }
        return documents.toObject();
    }
    async updateDocuments(dto) {
        if (!dto || Object.keys(dto).length === 0)
            throw new common_1.BadRequestException('No data provided');
        const documents = await this.documentsModel
            .findOneAndUpdate({}, dto, {
            new: true,
            upsert: true,
            runValidators: true
        })
            .exec();
        return documents.toObject();
    }
    async initializeDocuments(dto) {
        const existingDocuments = await this.documentsModel.findOne().exec();
        if (existingDocuments) {
            throw new common_1.BadRequestException('Documents already exist. Use update instead.');
        }
        const documents = await this.documentsModel.create(dto);
        return documents.toObject();
    }
    async generateFileUploadLink() {
        return this.awsService.generatePdfUploadLink('DOCUMENTS');
    }
    async deleteDocuments(fileUrls) {
        return this.awsService.deleteImages(fileUrls);
    }
    async search(query, limit = 10) {
        const pipeline = [
            {
                $search: {
                    index: 'default-documents',
                    compound: {
                        should: [
                            { text: { query, path: 'regulations.text.ro', fuzzy: {} } },
                            { text: { query, path: 'regulations.text.en', fuzzy: {} } },
                            { text: { query, path: 'regulations.text.ru', fuzzy: {} } },
                            { text: { query, path: 'statuses.text.ro', fuzzy: {} } },
                            { text: { query, path: 'statuses.text.en', fuzzy: {} } },
                            { text: { query, path: 'statuses.text.ru', fuzzy: {} } },
                            { text: { query, path: 'strategies.text.ro', fuzzy: {} } },
                            { text: { query, path: 'strategies.text.en', fuzzy: {} } },
                            { text: { query, path: 'strategies.text.ru', fuzzy: {} } },
                            { text: { query, path: 'agreements.text.ro', fuzzy: {} } },
                            { text: { query, path: 'agreements.text.en', fuzzy: {} } },
                            { text: { query, path: 'agreements.text.ru', fuzzy: {} } },
                            { text: { query, path: 'reports.text.ro', fuzzy: {} } },
                            { text: { query, path: 'reports.text.en', fuzzy: {} } },
                            { text: { query, path: 'reports.text.ru', fuzzy: {} } }
                        ]
                    }
                }
            },
            { $limit: limit }
        ];
        return this.documentsModel.aggregate(pipeline).exec();
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(documents_schema_1.Documents.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        aws_service_1.AwsService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map