import { Model } from 'mongoose';
import { Documents, DocumentsDocument } from 'src/schemas/documents.schema';
import { DocumentsDto } from './dto/documents.dto';
export declare class DocumentsService {
    private documentsModel;
    constructor(documentsModel: Model<DocumentsDocument>);
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
}
