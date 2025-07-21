import { BlogsService } from 'src/blogs/blogs.service';
import { DocumentsService } from 'src/documents/documents.service';
import { ResponseTypeEnums } from 'src/enums/response.enum';
import { ManagementService } from 'src/management/management.service';
export declare class SearchService {
    private readonly blogsService;
    private readonly documentsService;
    private readonly managementService;
    constructor(blogsService: BlogsService, documentsService: DocumentsService, managementService: ManagementService);
    searchAll(query: string): Promise<{
        results: {
            _id: any;
            title: any;
            content_type: any;
            authentic_local_category: any;
            response_type: ResponseTypeEnums;
        }[];
        stats: {
            total_blogs: number;
            total_blogs_news: number;
            total_blogs_project: number;
            total_blogs_authentic_local: number;
        };
    }>;
}
