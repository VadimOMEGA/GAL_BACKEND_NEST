import { PartialType } from "@nestjs/swagger";
import { DocumentsDto } from "./documents.dto";

export class UpdateDocumentsDto extends PartialType(DocumentsDto) {}