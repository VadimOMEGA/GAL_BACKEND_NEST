import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Statistics, StatisticsDocument } from 'src/schemas/statistics.schema'
import { StatisticsDto } from './dto/statistics.dto'

@Injectable()
export class StatisticsService {
	constructor(@InjectModel(Statistics.name) private statisticsModel: Model<StatisticsDocument>) {}

	async getStatistics() {
		const statistics = await this.statisticsModel.findOne().exec()

		if (!statistics) {
			throw new NotFoundException('Statistics not found')
		}

		return statistics.toObject()
	}

	async updateStatistics(dto: Partial<StatisticsDto>) {
        if (!dto || Object.keys(dto).length === 0) throw new BadRequestException('No data provided')
		const statistics = await this.statisticsModel
			.findOneAndUpdate({}, dto, {
				new: true,
				upsert: true,
				runValidators: true
			})
			.exec()

		return statistics.toObject()
	}

	async initializeStatistics(dto: StatisticsDto) {
		const existingStatistics = await this.statisticsModel.findOne().exec()

		if (existingStatistics) {
			throw new BadRequestException('Statistics already exist. Use update instead.')
		}

		const statistics = await this.statisticsModel.create(dto)

		return statistics.toObject()
	}
}
