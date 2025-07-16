import { DocumentsService } from './documents.service';
import { UpdateDocumentsDto } from './dto/documents-update.dto';
import { DocumentsDto } from './dto/documents.dto';
import { DeleteFilesDto } from './dto/delete-pdf.dto';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    getDocuments(): Promise<import("mongoose").Document<unknown, {}, import("../schemas/documents.schema").Documents, {}> & import("../schemas/documents.schema").Documents & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateDocuments(dto: UpdateDocumentsDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/documents.schema").Documents, {}> & import("../schemas/documents.schema").Documents & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    initializeDocuments(dto: DocumentsDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/documents.schema").Documents, {}> & import("../schemas/documents.schema").Documents & {
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
    deleteDocumentFiles(dto: DeleteFilesDto): Promise<{
        success: boolean;
    }>;
}
