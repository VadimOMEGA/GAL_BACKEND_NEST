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
}
