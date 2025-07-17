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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const blogs_service_1 = require("../blogs/blogs.service");
const documents_service_1 = require("../documents/documents.service");
const blog_enum_1 = require("../enums/blog.enum");
const response_enum_1 = require("../enums/response.enum");
const management_service_1 = require("../management/management.service");
let SearchService = class SearchService {
    blogsService;
    documentsService;
    managementService;
    constructor(blogsService, documentsService, managementService) {
        this.blogsService = blogsService;
        this.documentsService = documentsService;
        this.managementService = managementService;
    }
    async searchAll(query) {
        let management = [];
        let documents = [];
        let blogs = [];
        if (!query || !query.trim()) {
            const allBlogsResult = await this.blogsService.getAll({ page: 1, limit: 50 });
            blogs = allBlogsResult.blogs;
        }
        else {
            [management, documents, blogs] = await Promise.all([
                this.managementService.search(query, 1),
                this.documentsService.search(query, 1),
                this.blogsService.search(query, 50)
            ]);
        }
        const totalBlogs = blogs.length;
        const totalNews = blogs.filter((b) => b.content_type === blog_enum_1.BlogsContentTypeEnum.NEWS).length;
        const totalProject = blogs.filter((b) => b.content_type === blog_enum_1.BlogsContentTypeEnum.PROJECT).length;
        const totalAuthenticLocal = blogs.filter((b) => b.content_type === blog_enum_1.BlogsContentTypeEnum.AUTHENTIC_LOCAL).length;
        const blogsWithType = blogs.map((item) => ({
            _id: item._id,
            title: item.title,
            content_type: item.content_type,
            authentic_local_content_type: item.authentic_local_content_type,
            response_type: response_enum_1.ResponseTypeEnums.BLOG
        }));
        const documentsWithType = documents.map((item) => ({
            _id: item._id,
            title: {
                ro: 'Documente GAL - Arhiva de documente oficiale',
                ru: 'Документы GAL — Архив официальных документов',
                en: 'GAL Documents – Official Document Archive'
            },
            content_type: 'DOCUMENTS',
            authentic_local_content_type: 'DOCUMENTS',
            response_type: response_enum_1.ResponseTypeEnums.DOCUMENT
        }));
        const managementWithType = management.map((item) => ({
            _id: item._id,
            title: {
                ro: 'Conducerea GAL – Echipa de management',
                ru: 'Руководство GAL — Управленческая команда',
                en: 'GAL Management – Management Team'
            },
            content_type: 'MANAGEMENT',
            authentic_local_content_type: 'MANAGEMENT',
            response_type: response_enum_1.ResponseTypeEnums.MANAGEMENT
        }));
        return {
            results: [...managementWithType, ...documentsWithType, ...blogsWithType],
            stats: {
                total_blogs: totalBlogs,
                total_blogs_news: totalNews,
                total_blogs_project: totalProject,
                total_blogs_authentic_local: totalAuthenticLocal
            }
        };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService,
        documents_service_1.DocumentsService,
        management_service_1.ManagementService])
], SearchService);
//# sourceMappingURL=search.service.js.map