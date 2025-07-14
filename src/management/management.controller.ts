import { Body, Controller, Get, HttpCode, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { ManagementService } from './management.service'
import { ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UpdateManagementDto } from './dto/update-management.dto'
import { ManagementDto } from './dto/management.dto'

@ApiTags('🛠️ Management')
@Controller('management')
export class ManagementController {
	constructor(private readonly managementService: ManagementService) {}

	@Get()
	async getManagement() {
		return this.managementService.getManagement()
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
	async updateManagement(@Body() dto: UpdateManagementDto) {
		return this.managementService.updateManagement(dto)
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
	async initializeManagement(@Body() dto: ManagementDto) {
		return this.managementService.initializeManagement(dto)
	}
}
