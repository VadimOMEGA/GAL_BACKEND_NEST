import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Management, ManagementDocument } from 'src/schemas/management.schema'
import { ManagementDto } from './dto/management.dto'

@Injectable()
export class ManagementService {
	constructor(@InjectModel(Management.name) private managementModel: Model<ManagementDocument>) {}

	async getManagement() {
		const management = await this.managementModel.findOne().exec()

		if (!management) {
			throw new NotFoundException('Management not found')
		}

		return management.toObject()
	}

	async updateManagement(dto: Partial<ManagementDto>) {
		if (!dto || Object.keys(dto).length === 0) throw new BadRequestException('No data provided')
		const management = await this.managementModel
			.findOneAndUpdate({}, dto, {
				new: true,
				upsert: true,
				runValidators: true
			})
			.exec()

		return management.toObject()
	}

	async initializeManagement(dto: ManagementDto) {
		const existingManagement = await this.managementModel.findOne().exec()

		if (existingManagement) {
			throw new BadRequestException('Management already exists. Use update instead.')
		}

		const management = await this.managementModel.create(dto)

		return management.toObject()
	}

	async search(query: string, limit = 10) {
		const pipeline = [
			{
				$search: {
					index: 'default-management',
					compound: {
						should: [
							// President
							{ autocomplete: { query: query, path: 'president.text.ro', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'president.text.en', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'president.text.ru', fuzzy: {} } },
							// Executive
							{ autocomplete: { query: query, path: 'executive.column1.ro', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'executive.column1.en', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'executive.column1.ru', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'executive.column2.ro', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'executive.column2.en', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'executive.column2.ru', fuzzy: {} } },
							// General Assembly
							{ autocomplete: { query: query, path: 'general_assembly.column1.ro', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'general_assembly.column1.en', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'general_assembly.column1.ru', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'general_assembly.column2.ro', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'general_assembly.column2.en', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'general_assembly.column2.ru', fuzzy: {} } },
							// Administration
							{ autocomplete: { query: query, path: 'administration.column1.ro', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'administration.column1.en', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'administration.column1.ru', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'administration.column2.ro', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'administration.column2.en', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'administration.column2.ru', fuzzy: {} } },
							// Committee
							{ autocomplete: { query: query, path: 'committee.column1.ro', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'committee.column1.en', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'committee.column1.ru', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'committee.column2.ro', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'committee.column2.en', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'committee.column2.ru', fuzzy: {} } },
							// Censorship
							{ autocomplete: { query: query, path: 'censorship.column1.ro', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'censorship.column1.en', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'censorship.column1.ru', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'censorship.column2.ro', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'censorship.column2.en', fuzzy: {} } },
							{ autocomplete: { query: query, path: 'censorship.column2.ru', fuzzy: {} } }
						]
					}
				}
			},
			{ $limit: limit }
		]

		return this.managementModel.aggregate(pipeline).exec()
	}
}
