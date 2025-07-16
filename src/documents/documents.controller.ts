import { Body, Controller, Get, HttpCode, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { DocumentsService } from './documents.service'
import { ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UpdateDocumentsDto } from './dto/documents-update.dto'
import { DocumentsDto } from './dto/documents.dto'
import { DeleteFilesDto } from './dto/delete-pdf.dto'

@ApiTags('📄 Documents')
@Controller('documents')
export class DocumentsController {
	constructor(private readonly documentsService: DocumentsService) {}

	@Get()
	async getDocuments() {
		return this.documentsService.getDocuments()
	}

	@Put()
	@UsePipes(
		new ValidationPipe({
			transform: true,
			forbidNonWhitelisted: true,
			whitelist: true,
			skipMissingProperties: false
		})
	)
	@HttpCode(200)
	@Auth()
	async updateDocuments(@Body() dto: UpdateDocumentsDto) {
		return this.documentsService.updateDocuments(dto)
	}

	@Post('initialize')
	@UsePipes(
		new ValidationPipe({
			transform: true,
			forbidNonWhitelisted: true,
			whitelist: true,
			skipMissingProperties: false
		})
	)
	@HttpCode(200)
	@Auth()
	async initializeDocuments(@Body() dto: DocumentsDto) {
		return this.documentsService.initializeDocuments(dto)
	}

	// For PDF upload
	// For image upload
		@HttpCode(200)
		@Post('/generate-upload-link')
		@Auth()
		async generateImageUploadLink() {
			return this.documentsService.generateFileUploadLink()
		}
	
		@UsePipes(new ValidationPipe({ transform: true }))
		@HttpCode(200)
		@Post('delete-files')
		@Auth()
		async deleteDocumentFiles(@Body() dto: DeleteFilesDto) {
			return this.documentsService.deleteDocuments(dto.fileUrls)
		}
}
