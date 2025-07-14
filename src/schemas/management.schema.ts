import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { MultiLangText } from './shared/text.schema'

export type ManagementDocument = HydratedDocument<Management>

@Schema({ _id: false })
export class President {
	@Prop({ type: MultiLangText, required: true })
	text: MultiLangText

	@Prop({ type: String, required: true, default: '' })
	image: string
}

@Schema({ _id: false })
export class Executive {
	@Prop({ type: MultiLangText, required: true })
	column1: MultiLangText

	@Prop({ type: MultiLangText, required: false, default: '' })
	column2?: MultiLangText
}

@Schema({ _id: false })
export class GeneralAssembly {
	@Prop({ type: MultiLangText, required: true })
	column1: MultiLangText

	@Prop({ type: MultiLangText, required: false, default: '' })
	column2?: MultiLangText
}

@Schema({ _id: false })
export class Administration {
	@Prop({ type: MultiLangText, required: true })
	column1: MultiLangText

	@Prop({ type: MultiLangText, required: false, default: '' })
	column2?: MultiLangText
}

@Schema({ _id: false })
export class Committee {
	@Prop({ type: MultiLangText, required: true })
	column1: MultiLangText

	@Prop({ type: MultiLangText, required: false, default: '' })
	column2?: MultiLangText
}

@Schema({ _id: false })
export class Censorship {
	@Prop({ type: MultiLangText, required: true })
	column1: MultiLangText

	@Prop({ type: MultiLangText, required: false, default: '' })
	column2?: MultiLangText
}

@Schema({ timestamps: true, collection: 'management' })
export class Management {
	@Prop({ type: String, required: true, default: '' })
	main_image: string

	@Prop({ type: President, required: true })
	president: President

	@Prop({ type: Executive, required: true })
	executive: Executive

	@Prop({ type: GeneralAssembly, required: true })
	general_assembly: GeneralAssembly

	@Prop({ type: Administration, required: true })
	administration: Administration

	@Prop({ type: Committee, required: true })
	committee: Committee

	@Prop({ type: Censorship, required: true })
	censorship: Censorship
}

export const ManagementSchema = SchemaFactory.createForClass(Management)
