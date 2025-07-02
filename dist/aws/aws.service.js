"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let AwsService = class AwsService {
    s3 = new client_s3_1.S3Client({
        region: process.env.AWS_REGION || 'eu-north-1',
        credentials: {
            accessKeyId: process.env.AWS_PUBLIC_ACCESS_KEY || '',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
        }
    });
    async generateUploadLink(id, destination) {
        const hash = crypto_1.default.randomBytes(4).toString('hex');
        const fileName = `${destination}/${id}/${hash}.png`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName
        });
        const uploadUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 3600 });
        return {
            success: true,
            imageUrl: uploadUrl,
            key: fileName
        };
    }
    async deleteImages(images) {
        const keys = images.map((image) => ({
            Key: image.replace(`https://${process.env.AWS_CLOUDFRONT_DOMAIN}.cloudfront.net/`, '')
        }));
        await this.s3.send(new client_s3_1.DeleteObjectsCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Delete: { Objects: keys }
        }));
        return {
            success: true
        };
    }
};
exports.AwsService = AwsService;
exports.AwsService = AwsService = __decorate([
    (0, common_1.Injectable)()
], AwsService);
//# sourceMappingURL=aws.service.js.map