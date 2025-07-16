import { Model } from 'mongoose';
import { Documents, DocumentsDocument } from 'src/schemas/documents.schema';
import { DocumentsDto } from './dto/documents.dto';
import { AwsService } from 'src/aws/aws.service';
export declare class DocumentsService {
    private documentsModel;
    private readonly awsService;
    constructor(documentsModel: Model<DocumentsDocument>, awsService: AwsService);
    getDocuments(): Promise<import("mongoose").Document<unknown, {}, Documents, {}> & Documents & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateDocuments(dto: Partial<DocumentsDto>): Promise<import("mongoose").Document<unknown, {}, Documents, {}> & Documents & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    initializeDocuments(dto: DocumentsDto): Promise<import("mongoose").Document<unknown, {}, Documents, {}> & Documents & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    generateFileUploadLink(): Promise<{
        success: boolean;
        uploadUrl: string;
        publicUrl: string;
        key: string;
    }>;
    deleteDocuments(fileUrls: string[]): Promise<{
        success: boolean;
    }>;
}
