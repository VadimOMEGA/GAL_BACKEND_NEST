import { Model } from 'mongoose';
import { Blog, BlogDocument } from 'src/schemas/blog.schema';
import { BlogDto } from './dto/blog.dto';
import { AwsService } from 'src/aws/aws.service';
import { GetBlogsDto } from './dto/get-blogs.dto';
export declare class BlogsService {
    private blogModel;
    private readonly awsService;
    constructor(blogModel: Model<BlogDocument>, awsService: AwsService);
    getAll(getBlogsDto: GetBlogsDto): Promise<{
        blogs: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Blog, {}> & Blog & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, Blog, {}> & Blog & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
        filters: {
            searchTerm: string | undefined;
            contentType: import("../enums/blog.enum").BlogsContentTypeEnum | undefined;
            category: import("../enums/blog.enum").BlogsCategoriesEnum | undefined;
            authenticLocalCategory: import("../enums/blog.enum").AuthenticLocalCategoriesEnum | undefined;
        };
    }>;
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Blog, {}> & Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, Blog, {}> & Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    create(dto: BlogDto): Promise<import("mongoose").Document<unknown, {}, Blog, {}> & Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: Partial<BlogDto>): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Blog, {}> & Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, Blog, {}> & Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Blog, {}> & Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, Blog, {}> & Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    generateImageUploadLink(): Promise<{
        success: boolean;
        uploadUrl: string;
        publicUrl: string;
        key: string;
    }>;
    deleteBlogImages(imageUrls: string[]): Promise<{
        success: boolean;
    }>;
}
