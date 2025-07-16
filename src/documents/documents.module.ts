import { Module } from '@nestjs/common'
import { DocumentsService } from './documents.service'
import { DocumentsController } from './documents.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Documents, DocumentsSchema } from 'src/schemas/documents.schema'
import { AwsModule } from 'src/aws/aws.module'

@Module({
	imports: [AwsModule, MongooseModule.forFeature([{ name: Documents.name, schema: DocumentsSchema }])],
	controllers: [DocumentsController],
	providers: [DocumentsService]
})
export class DocumentsModule {}
