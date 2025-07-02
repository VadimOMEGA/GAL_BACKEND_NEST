"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerUpdateAdmin = SwaggerUpdateAdmin;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function SwaggerUpdateAdmin() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({
        summary: 'Update admin profile',
        description: 'Update current admin profile information (username and/or password). Requires authentication.'
    }), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, swagger_1.ApiBody)({
        description: 'Admin profile update data (partial update supported)',
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'newAdminUsername',
                    description: 'New admin username (optional)'
                },
                password: {
                    type: 'string',
                    example: 'newSecurePassword123',
                    description: 'New admin password (optional)',
                    minLength: 1
                }
            }
        },
        examples: {
            updateUsername: {
                summary: 'Update username only',
                value: {
                    username: 'newAdminUsername'
                }
            },
            updatePassword: {
                summary: 'Update password only',
                value: {
                    password: 'newSecurePassword123'
                }
            },
            updateBoth: {
                summary: 'Update both username and password',
                value: {
                    username: 'newAdminUsername',
                    password: 'newSecurePassword123'
                }
            }
        }
    }), (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Admin profile updated successfully',
        schema: {
            type: 'object',
            properties: {
                _id: {
                    type: 'string',
                    example: '507f1f77bcf86cd799439011',
                    description: 'Admin ID'
                },
                username: {
                    type: 'string',
                    example: 'newAdminUsername',
                    description: 'Updated admin username'
                }
            }
        }
    }), (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Validation failed',
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'array',
                    items: { type: 'string' },
                    example: ['username should not be empty', 'password should not be empty']
                },
                error: { type: 'string', example: 'Bad Request' },
                statusCode: { type: 'number', example: 400 }
            }
        }
    }), (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - JWT token required or invalid',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Unauthorized' },
                statusCode: { type: 'number', example: 401 }
            }
        }
    }), (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Admin not found',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Admin not found' },
                error: { type: 'string', example: 'Not Found' },
                statusCode: { type: 'number', example: 404 }
            }
        }
    }));
}
//# sourceMappingURL=swagger.decorators.js.map