import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/blog.dto';
import { DeleteImagesDto } from './dto/delete-images.dto';
import { UpdateBlogDto } from './dto/update-blog-dto';
import { GetBlogsDto } from './dto/get-blogs.dto';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    getAll(getBlogsDto: GetBlogsDto): Promise<{
        blogs: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/blog.schema").Blog, {}> & import("../schemas/blog.schema").Blog & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}> & import("mongoose").Document<unknown, {}, import("../schemas/blog.schema").Blog, {}> & import("../schemas/blog.schema").Blog & {
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
    getById(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/blog.schema").Blog, {}> & import("../schemas/blog.schema").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, import("../schemas/blog.schema").Blog, {}> & import("../schemas/blog.schema").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    create(dto: BlogDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/blog.schema").Blog, {}> & import("../schemas/blog.schema").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdateBlogDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/blog.schema").Blog, {}> & import("../schemas/blog.schema").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, import("../schemas/blog.schema").Blog, {}> & import("../schemas/blog.schema").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../schemas/blog.schema").Blog, {}> & import("../schemas/blog.schema").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, import("../schemas/blog.schema").Blog, {}> & import("../schemas/blog.schema").Blog & {
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
    deleteBlogImages(dto: DeleteImagesDto): Promise<{
        success: boolean;
    }>;
}
