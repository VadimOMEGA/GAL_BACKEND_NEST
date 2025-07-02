import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { hash } from 'argon2'
import { Model } from 'mongoose'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { Admin } from 'src/schemas/admin.schema'
import { AdminDto } from './dto/admin.dto'

@Injectable()
export class AdminService {
	constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

	getById(id: string) {
		return this.adminModel.findById(id).exec()
	}

	getByUsername(username: string) {
		return this.adminModel.findOne({ username }).exec()
	}

	async create(dto: AuthDto){
		const admin = {
			username: dto.username,
			password: await hash(dto.password)
		}

		return this.adminModel.create(admin)
	}

	async update(id: string, dto: AdminDto) {
		let data = dto

		if(dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}

		return this.adminModel.findByIdAndUpdate(id, data, { new: true }).select('-password').exec()
	}
}
