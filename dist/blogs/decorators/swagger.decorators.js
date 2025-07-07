"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerGetBlogs = SwaggerGetBlogs;
exports.SwaggerGetBlogById = SwaggerGetBlogById;
exports.SwaggerCreateBlog = SwaggerCreateBlog;
exports.SwaggerUpdateBlog = SwaggerUpdateBlog;
exports.SwaggerDeleteBlog = SwaggerDeleteBlog;
exports.SwaggerGenerateUploadLink = SwaggerGenerateUploadLink;
exports.SwaggerDeleteImages = SwaggerDeleteImages;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function SwaggerGetBlogs() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({
        summary: 'Get all blogs',
        description: 'Retrieve all blogs with optional filtering, searching and pagination'
    }), (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
        example: 1
    }), (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of items per page (default: 12, max: 16)',
        example: 12
    }), (0, swagger_1.ApiQuery)({
        name: 'q',
        required: false,
        type: String,
        description: 'Search term to search in titles, summaries, content types and categories',
        example: 'logistics'
    }), (0, swagger_1.ApiQuery)({
        name: 'content_type',
        required: false,
        enum: ['NEWS', 'PROJECT', 'AUTHENTIC_LOCAL'],
        description: 'Filter by content type',
        example: 'NEWS'
    }), (0, swagger_1.ApiQuery)({
        name: 'category',
        required: false,
        enum: ['NEWS', 'ENTERPRENEURSHIP', 'LOGISTICS', 'PUBLIC'],
        description: 'Filter by category',
        example: 'LOGISTICS'
    }), (0, swagger_1.ApiQuery)({
        name: 'authentic_local_category',
        required: false,
        enum: ['LOCAL_PRODUCTS', 'SERVICES', 'TOURIST_ATTRACTIONS', 'PEOPLE_AND_VALUES'],
        description: 'Filter by authentic local category',
        example: 'LOCAL_PRODUCTS'
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved blogs',
        schema: {
            type: 'object',
            properties: {
                blogs: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Blog' }
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number', example: 1 },
                        limit: { type: 'number', example: 12 },
                        total: { type: 'number', example: 45 },
                        totalPages: { type: 'number', example: 4 },
                        hasNextPage: { type: 'boolean', example: true },
                        hasPrevPage: { type: 'boolean', example: false }
                    }
                },
                filters: {
                    type: 'object',
                    properties: {
                        searchTerm: { type: 'string', example: 'logistics' },
                        contentType: { type: 'string', example: 'NEWS' },
                        category: { type: 'string', example: 'LOGISTICS' }
                    }
                }
            }
        }
    }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Invalid query parameters' }));
}
function SwaggerGetBlogById() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({
        summary: 'Get blog by ID',
        description: 'Retrieve a specific blog by its ID'
    }), (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'Blog ID',
        example: '507f1f77bcf86cd799439011'
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully retrieved blog',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                title: {
                    type: 'object',
                    properties: {
                        ro: { type: 'string', example: 'Titlu în română' },
                        ru: { type: 'string', example: 'Заголовок на русском' },
                        en: { type: 'string', example: 'Title in English' }
                    }
                },
                content_type: { type: 'string', example: 'NEWS' },
                categories: { type: 'array', items: { type: 'string' }, example: ['LOGISTICS', 'PUBLIC'] },
                main_image: { type: 'string', example: 'https://example.com/image.jpg' }
            }
        }
    }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog not found' }));
}
function SwaggerCreateBlog() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({
        summary: 'Create a new blog',
        description: 'Create a new blog post. Requires authentication.'
    }), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, swagger_1.ApiBody)({
        description: 'Blog data',
        schema: {
            type: 'object',
            required: ['title', 'content_type', 'categories', 'main_image', 'summary', 'sections'],
            properties: {
                title: {
                    type: 'object',
                    required: ['ro', 'ru', 'en'],
                    properties: {
                        ro: { type: 'string', example: 'Titlu în română' },
                        ru: { type: 'string', example: 'Заголовок на русском' },
                        en: { type: 'string', example: 'Title in English' }
                    }
                },
                content_type: {
                    type: 'string',
                    enum: ['NEWS', 'PROJECT', 'AUTHENTIC_LOCAL'],
                    example: 'NEWS'
                },
                categories: {
                    type: 'array',
                    items: {
                        type: 'string',
                        enum: ['NEWS', 'ENTERPRENEURSHIP', 'LOGISTICS', 'PUBLIC']
                    },
                    example: ['LOGISTICS', 'PUBLIC']
                },
                main_image: {
                    type: 'string',
                    example: 'https://example.com/image.jpg',
                    minLength: 1
                },
                summary: {
                    type: 'object',
                    required: ['column1'],
                    properties: {
                        column1: {
                            type: 'object',
                            required: ['ro', 'ru', 'en'],
                            properties: {
                                ro: { type: 'string', example: 'Rezumat coloana 1 în română' },
                                ru: { type: 'string', example: 'Резюме колонка 1 на русском' },
                                en: { type: 'string', example: 'Summary column 1 in English' }
                            }
                        },
                        column2: {
                            type: 'object',
                            properties: {
                                ro: { type: 'string', example: 'Rezumat coloana 2 în română' },
                                ru: { type: 'string', example: 'Резюме колонка 2 на русском' },
                                en: { type: 'string', example: 'Summary column 2 in English' }
                            }
                        }
                    }
                },
                sections: {
                    type: 'array',
                    minItems: 1,
                    items: {
                        type: 'object',
                        required: ['title', 'subsections'],
                        properties: {
                            title: {
                                type: 'object',
                                required: ['ro', 'ru', 'en'],
                                properties: {
                                    ro: { type: 'string', example: 'Secțiune în română' },
                                    ru: { type: 'string', example: 'Раздел на русском' },
                                    en: { type: 'string', example: 'Section in English' }
                                }
                            },
                            subsections: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'object',
                                            properties: {
                                                ro: { type: 'string', example: 'Subsecțiune în română' },
                                                ru: { type: 'string', example: 'Подраздел на русском' },
                                                en: { type: 'string', example: 'Subsection in English' }
                                            }
                                        },
                                        column1: {
                                            type: 'object',
                                            properties: {
                                                ro: { type: 'string', example: 'Conținut coloana 1 în română' },
                                                ru: { type: 'string', example: 'Содержание колонка 1 на русском' },
                                                en: { type: 'string', example: 'Content column 1 in English' }
                                            }
                                        },
                                        images: {
                                            type: 'array',
                                            items: { type: 'string' },
                                            example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Blog created successfully'
    }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Validation failed' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - JWT token required' }));
}
function SwaggerUpdateBlog() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({
        summary: 'Update blog',
        description: 'Update an existing blog by ID. Requires authentication. Supports partial updates.'
    }), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'Blog ID to update',
        example: '507f1f77bcf86cd799439011'
    }), (0, swagger_1.ApiBody)({
        description: 'Updated blog data (partial update supported)',
        schema: {
            type: 'object',
            properties: {
                title: {
                    type: 'object',
                    properties: {
                        ro: { type: 'string', example: 'Titlu actualizat în română' },
                        ru: { type: 'string', example: 'Обновленный заголовок на русском' },
                        en: { type: 'string', example: 'Updated title in English' }
                    }
                },
                content_type: {
                    type: 'string',
                    enum: ['NEWS', 'PROJECT', 'AUTHENTIC_LOCAL'],
                    example: 'PROJECT'
                },
                categories: {
                    type: 'array',
                    items: {
                        type: 'string',
                        enum: ['NEWS', 'ENTERPRENEURSHIP', 'LOGISTICS', 'PUBLIC']
                    },
                    example: ['LOGISTICS']
                },
                main_image: {
                    type: 'string',
                    example: 'https://example.com/updated-image.jpg'
                }
            }
        }
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Blog updated successfully'
    }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Validation failed or no data provided' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - JWT token required' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog not found' }));
}
function SwaggerDeleteBlog() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({
        summary: 'Delete blog',
        description: 'Delete a blog by ID. Requires authentication.'
    }), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'Blog ID to delete',
        example: '507f1f77bcf86cd799439011'
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Blog deleted successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Blog deleted successfully' }
            }
        }
    }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - JWT token required' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog not found' }));
}
function SwaggerGenerateUploadLink() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({
        summary: 'Generate image upload link',
        description: 'Generate a pre-signed URL for uploading images to AWS S3. Requires authentication.'
    }), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Upload link generated successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                imageUrl: { type: 'string', example: 'https://s3.amazonaws.com/bucket/presigned-url' },
                key: { type: 'string', example: 'BLOGS/hash.png' }
            }
        }
    }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - JWT token required' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog not found' }));
}
function SwaggerDeleteImages() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({
        summary: 'Delete images',
        description: 'Delete multiple images from AWS S3. Requires authentication.'
    }), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, swagger_1.ApiBody)({
        description: 'Array of image URLs to delete',
        schema: {
            type: 'object',
            required: ['imageUrls'],
            properties: {
                imageUrls: {
                    type: 'array',
                    items: { type: 'string', format: 'url' },
                    example: [
                        'https://example.cloudfront.net/image1.jpg',
                        'https://example.cloudfront.net/image2.png'
                    ],
                    minItems: 1
                }
            }
        }
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Images deleted successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: 'Images deleted successfully' }
            }
        }
    }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Invalid image URLs' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized - JWT token required' }));
}
//# sourceMappingURL=swagger.decorators.js.map