import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Documents, DocumentsDocument } from 'src/schemas/documents.schema'
import { DocumentsDto } from './dto/documents.dto'
import { AwsService } from 'src/aws/aws.service'

@Injectable()
export class DocumentsService {
	constructor(
		@InjectModel(Documents.name) private documentsModel: Model<DocumentsDocument>,
		private readonly awsService: AwsService
	) {}

	async getDocuments() {
		const documents = await this.documentsModel.findOne().exec()

		if (!documents) {
			throw new NotFoundException('Documents not found')
		}

		return documents.toObject()
	}

	async updateDocuments(dto: Partial<DocumentsDto>) {
		if (!dto || Object.keys(dto).length === 0) throw new BadRequestException('No data provided')
		const documents = await this.documentsModel
			.findOneAndUpdate({}, dto, {
				new: true,
				upsert: true,
				runValidators: true
			})
			.exec()

		return documents.toObject()
	}

	async initializeDocuments(dto: DocumentsDto) {
		const existingDocuments = await this.documentsModel.findOne().exec()

		if (existingDocuments) {
			throw new BadRequestException('Documents already exist. Use update instead.')
		}

		const documents = await this.documentsModel.create(dto)

		return documents.toObject()
	}

	// For PDF upload
	async generateFileUploadLink() {
		return this.awsService.generatePdfUploadLink('DOCUMENTS')
	}

	async deleteDocuments(fileUrls: string[]) {
		return this.awsService.deleteImages(fileUrls)
	}

	// For search

	async search(query: string, limit = 10) {
		const pipeline = [
			{
				$search: {
					index: 'default-documents',
					compound: {
						should: [
							{ text: { query, path: 'regulations.text.ro', fuzzy: {} } },
							{ text: { query, path: 'regulations.text.en', fuzzy: {} } },
							{ text: { query, path: 'regulations.text.ru', fuzzy: {} } },
							{ text: { query, path: 'statuses.text.ro', fuzzy: {} } },
							{ text: { query, path: 'statuses.text.en', fuzzy: {} } },
							{ text: { query, path: 'statuses.text.ru', fuzzy: {} } },
							{ text: { query, path: 'strategies.text.ro', fuzzy: {} } },
							{ text: { query, path: 'strategies.text.en', fuzzy: {} } },
							{ text: { query, path: 'strategies.text.ru', fuzzy: {} } },
							{ text: { query, path: 'agreements.text.ro', fuzzy: {} } },
							{ text: { query, path: 'agreements.text.en', fuzzy: {} } },
							{ text: { query, path: 'agreements.text.ru', fuzzy: {} } },
							{ text: { query, path: 'reports.text.ro', fuzzy: {} } },
							{ text: { query, path: 'reports.text.en', fuzzy: {} } },
							{ text: { query, path: 'reports.text.ru', fuzzy: {} } }
						]
					}
				}
			},
			{ $limit: limit }
		]

		return this.documentsModel.aggregate(pipeline).exec()
	}
}
