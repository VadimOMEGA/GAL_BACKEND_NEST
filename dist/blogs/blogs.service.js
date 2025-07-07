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
        const query = {};
        if (q) {
            query.$or = [
                { 'title.ro': { $regex: q, $options: 'i' } },
                { 'title.en': { $regex: q, $options: 'i' } },
                { 'title.ru': { $regex: q, $options: 'i' } },
                { 'summary.column1.ro': { $regex: q, $options: 'i' } },
                { 'summary.column1.ru': { $regex: q, $options: 'i' } },
                { 'summary.column1.en': { $regex: q, $options: 'i' } },
                { 'summary.column2.ro': { $regex: q, $options: 'i' } },
                { 'summary.column2.ru': { $regex: q, $options: 'i' } },
                { 'summary.column2.en': { $regex: q, $options: 'i' } },
                { content_type: { $regex: q, $options: 'i' } },
                { categories: { $regex: q, $options: 'i' } },
                { authentic_local_category: { $regex: q, $options: 'i' } }
            ];
        }
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
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        aws_service_1.AwsService])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map