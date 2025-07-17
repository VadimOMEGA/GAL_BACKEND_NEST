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
exports.ManagementService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const management_schema_1 = require("../schemas/management.schema");
let ManagementService = class ManagementService {
    managementModel;
    constructor(managementModel) {
        this.managementModel = managementModel;
    }
    async getManagement() {
        const management = await this.managementModel.findOne().exec();
        if (!management) {
            throw new common_1.NotFoundException('Management not found');
        }
        return management.toObject();
    }
    async updateManagement(dto) {
        if (!dto || Object.keys(dto).length === 0)
            throw new common_1.BadRequestException('No data provided');
        const management = await this.managementModel
            .findOneAndUpdate({}, dto, {
            new: true,
            upsert: true,
            runValidators: true
        })
            .exec();
        return management.toObject();
    }
    async initializeManagement(dto) {
        const existingManagement = await this.managementModel.findOne().exec();
        if (existingManagement) {
            throw new common_1.BadRequestException('Management already exists. Use update instead.');
        }
        const management = await this.managementModel.create(dto);
        return management.toObject();
    }
    async search(query, limit = 10) {
        const pipeline = [
            {
                $search: {
                    index: 'default-management',
                    compound: {
                        should: [
                            { autocomplete: { query: query, path: 'president.text.ro', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'president.text.en', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'president.text.ru', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'executive.column1.ro', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'executive.column1.en', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'executive.column1.ru', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'executive.column2.ro', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'executive.column2.en', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'executive.column2.ru', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'general_assembly.column1.ro', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'general_assembly.column1.en', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'general_assembly.column1.ru', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'general_assembly.column2.ro', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'general_assembly.column2.en', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'general_assembly.column2.ru', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'administration.column1.ro', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'administration.column1.en', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'administration.column1.ru', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'administration.column2.ro', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'administration.column2.en', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'administration.column2.ru', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'committee.column1.ro', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'committee.column1.en', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'committee.column1.ru', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'committee.column2.ro', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'committee.column2.en', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'committee.column2.ru', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'censorship.column1.ro', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'censorship.column1.en', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'censorship.column1.ru', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'censorship.column2.ro', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'censorship.column2.en', fuzzy: { prefixLength: 5 } } },
                            { autocomplete: { query: query, path: 'censorship.column2.ru', fuzzy: { prefixLength: 5 } } }
                        ]
                    }
                }
            },
            { $limit: limit }
        ];
        return this.managementModel.aggregate(pipeline).exec();
    }
};
exports.ManagementService = ManagementService;
exports.ManagementService = ManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(management_schema_1.Management.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ManagementService);
//# sourceMappingURL=management.service.js.map