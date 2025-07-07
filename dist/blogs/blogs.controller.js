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
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const blogs_service_1 = require("./blogs.service");
const blog_dto_1 = require("./dto/blog.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const delete_images_dto_1 = require("./dto/delete-images.dto");
const update_blog_dto_1 = require("./dto/update-blog-dto");
const get_blogs_dto_1 = require("./dto/get-blogs.dto");
const swagger_decorators_1 = require("./decorators/swagger.decorators");
const swagger_1 = require("@nestjs/swagger");
let BlogsController = class BlogsController {
    blogsService;
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    async getAll(getBlogsDto) {
        return this.blogsService.getAll(getBlogsDto);
    }
    async getById(id) {
        return this.blogsService.getById(id);
    }
    async create(dto) {
        return this.blogsService.create(dto);
    }
    async update(id, dto) {
        return this.blogsService.update(id, dto);
    }
    async delete(id) {
        return this.blogsService.delete(id);
    }
    async generateImageUploadLink() {
        return this.blogsService.generateImageUploadLink();
    }
    async deleteBlogImages(dto) {
        return this.blogsService.deleteBlogImages(dto.imageUrls);
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_decorators_1.SwaggerGetBlogs)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_blogs_dto_1.GetBlogsDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_decorators_1.SwaggerGetBlogById)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getById", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true })),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    (0, swagger_decorators_1.SwaggerCreateBlog)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "create", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true, skipMissingProperties: false })),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(':id'),
    (0, swagger_decorators_1.SwaggerUpdateBlog)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_blog_dto_1.UpdateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    (0, swagger_decorators_1.SwaggerDeleteBlog)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "delete", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('/generate-upload-link'),
    (0, swagger_decorators_1.SwaggerGenerateUploadLink)(),
    (0, auth_decorator_1.Auth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "generateImageUploadLink", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('delete-images'),
    (0, swagger_decorators_1.SwaggerDeleteImages)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_images_dto_1.DeleteImagesDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "deleteBlogImages", null);
exports.BlogsController = BlogsController = __decorate([
    (0, swagger_1.ApiTags)('📝 Blogs'),
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsController);
//# sourceMappingURL=blogs.controller.js.map