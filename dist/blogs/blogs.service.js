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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_schema_1 = require("../schemas/blog.schema");
const aws_service_1 = require("../aws/aws.service");
let BlogsService = class BlogsService {
    blogModel;
    awsService;
    constructor(blogModel, awsService) {
        this.blogModel = blogModel;
        this.awsService = awsService;
    }
    async getAll(getBlogsDto) {
        const { page = 1, limit = 12, q, content_type, category, authentic_local_category } = getBlogsDto;
        const skip = (page - 1) * limit;
        const filters = [];
        if (content_type)
            filters.push({ content_type });
        if (category)
            filters.push({ categories: category });
        if (authentic_local_category)
            filters.push({ authentic_local_category });
        if (q) {
            const aggregatePipeline = [
                {
                    $search: {
                        index: 'default',
                        compound: {
                            should: [
                                { text: { query: q, path: 'title.ro', fuzzy: {} } },
                                { text: { query: q, path: 'title.en', fuzzy: {} } },
                                { text: { query: q, path: 'title.ru', fuzzy: {} } },
                                { text: { query: q, path: 'summary.column1.ro', fuzzy: {} } },
                                { text: { query: q, path: 'summary.column1.en', fuzzy: {} } },
                                { text: { query: q, path: 'summary.column1.ru', fuzzy: {} } },
                                { text: { query: q, path: 'summary.column2.ro', fuzzy: {} } },
                                { text: { query: q, path: 'summary.column2.en', fuzzy: {} } },
                                { text: { query: q, path: 'summary.column2.ru', fuzzy: {} } },
                                { text: { query: q, path: 'sections.title.ro', fuzzy: {} } },
                                { text: { query: q, path: 'sections.title.en', fuzzy: {} } },
                                { text: { query: q, path: 'sections.title.ru', fuzzy: {} } },
                                { text: { query: q, path: 'sections.subsections.column1.ro', fuzzy: {} } },
                                { text: { query: q, path: 'sections.subsections.column1.en', fuzzy: {} } },
                                { text: { query: q, path: 'sections.subsections.column1.ru', fuzzy: {} } },
                                { text: { query: q, path: 'sections.subsections.column2.ro', fuzzy: {} } },
                                { text: { query: q, path: 'sections.subsections.column2.en', fuzzy: {} } },
                                { text: { query: q, path: 'sections.subsections.column2.ru', fuzzy: {} } },
                                { text: { query: q, path: 'sections.subsections.title.ro', fuzzy: {} } },
                                { text: { query: q, path: 'sections.subsections.title.en', fuzzy: {} } },
                                { text: { query: q, path: 'sections.subsections.title.ru', fuzzy: {} } },
                                { text: { query: q, path: 'content_type', fuzzy: {} } },
                                { text: { query: q, path: 'categories', fuzzy: {} } },
                                { text: { query: q, path: 'authentic_local_category', fuzzy: {} } }
                            ]
                        }
                    }
                },
                ...(filters.length ? [{ $match: { $and: filters } }] : []),
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit },
                {
                    $facet: {
                        blogs: [{ $match: {} }],
                        total: [{ $count: 'count' }]
                    }
                }
            ];
            const [result] = await this.blogModel.aggregate(aggregatePipeline).exec();
            const blogs = result?.blogs || [];
            const total = result?.total?.[0]?.count || 0;
            return {
                blogs,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNextPage: page < Math.ceil(total / limit),
                    hasPrevPage: page > 1
                },
                filters: {
                    searchTerm: q,
                    contentType: content_type,
                    category,
                    authenticLocalCategory: authentic_local_category
                }
            };
        }
        const query = {};
        if (content_type)
            query.content_type = content_type;
        if (category)
            query.categories = { $in: [category] };
        if (authentic_local_category)
            query.authentic_local_category = authentic_local_category;
        const [blogs, total] = await Promise.all([
            this.blogModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
            this.blogModel.countDocuments(query).exec()
        ]);
        return {
            blogs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPrevPage: page > 1
            },
            filters: {
                searchTerm: q,
                contentType: content_type,
                category,
                authenticLocalCategory: authentic_local_category
            }
        };
    }
    async getById(id) {
        const blog = await this.blogModel.findById(id).exec();
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async create(dto) {
        const blog = (await this.blogModel.create(dto)).toObject();
        return blog;
    }
    async update(id, dto) {
        if (!dto || Object.keys(dto).length === 0)
            throw new common_1.BadRequestException('No data provided');
        let data = dto;
        return this.blogModel.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        const blog = await this.blogModel.findByIdAndDelete(id).exec();
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async generateImageUploadLink() {
        return this.awsService.generateUploadLink('BLOGS');
    }
    async deleteBlogImages(imageUrls) {
        return this.awsService.deleteImages(imageUrls);
    }
    async search(q, limit = 10) {
        const aggregatePipeline = [
            {
                $search: {
                    index: 'default',
                    compound: {
                        should: [
                            { autocomplete: { query: q, path: 'title.ro', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'title.en', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'title.ru', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'summary.column1.ro', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'summary.column1.en', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'summary.column1.ru', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'summary.column2.ro', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'summary.column2.en', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'summary.column2.ru', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'sections.title.ro', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'sections.title.en', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'sections.title.ru', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'sections.subsections.column1.ro', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'sections.subsections.column1.en', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'sections.subsections.column1.ru', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'sections.subsections.column2.ro', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'sections.subsections.column2.en', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'sections.subsections.column2.ru', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'sections.subsections.title.ro', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'sections.subsections.title.en', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'sections.subsections.title.ru', fuzzy: {} } },
                            { autocomplete: { query: q, path: 'content_type', fuzzy: {} } },
                            { text: { query: q, path: 'categories', synonyms: "categorySynonyms" } },
                            { autocomplete: { query: q, path: 'authentic_local_category', fuzzy: {} } }
                        ]
                    }
                }
            },
            { $limit: limit }
        ];
        return this.blogModel.aggregate(aggregatePipeline).sort({ createdAt: -1 }).exec();
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        aws_service_1.AwsService])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map