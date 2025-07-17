import { Module } from '@nestjs/common'
import { ManagementService } from './management.service'
import { ManagementController } from './management.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Management, ManagementSchema } from 'src/schemas/management.schema'

@Module({
	imports: [MongooseModule.forFeature([{ name: Management.name, schema: ManagementSchema }])],
	controllers: [ManagementController],
	providers: [ManagementService],
	exports: [ManagementService]
})
export class ManagementModule {}
