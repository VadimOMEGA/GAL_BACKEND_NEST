import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(query: string): Promise<{
        results: {
            _id: any;
            title: any;
            content_type: any;
            authentic_local_content_type: any;
            response_type: import("../enums/response.enum").ResponseTypeEnums;
        }[];
        stats: {
            total_blogs: number;
            total_blogs_news: number;
            total_blogs_project: number;
            total_blogs_authentic_local: number;
        };
    }>;
}
