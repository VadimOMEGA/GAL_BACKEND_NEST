import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import cuid from 'cuid'
import { HydratedDocument } from 'mongoose'
import { BlogsCategoriesEnum, BlogsContentTypeEnum } from 'src/enums/blog.enum'

export type BlogDocument = HydratedDocument<Blog>

// Helper classes
@Schema({ _id: false })
export class MultiLangText {
	@Prop({ type: String, required: true })
	ro: string

	@Prop({ type: String, required: true })
	ru: string

	@Prop({ type: String, required: true })
	en: string
}

@Schema({ _id: false })
export class Summary {
	@Prop({ type: MultiLangText, required: true })
	column1: MultiLangText

	@Prop({ type: MultiLangText, required: false })
	column2: MultiLangText
}

@Schema({ _id: false })
export class SubSection {
	@Prop({ type: MultiLangText, required: true })
	title: MultiLangText

	@Prop({ type: MultiLangText, required: true })
	column1: MultiLangText

	@Prop({ type: MultiLangText, required: false })
	column2: MultiLangText

	@Prop({ type: [String], required: false })
	images: string[]
}

@Schema({ _id: false })
export class Section {
	@Prop({ type: MultiLangText, required: true })
	title: MultiLangText

	@Prop({ type: [SubSection], required: true })
	subsections: SubSection[]
}


// Main Blog schema

@Schema({ timestamps: true })
export class Blog {

	@Prop({ type: MultiLangText, required: true })
	title: MultiLangText

	@Prop({ type: String, enum: BlogsContentTypeEnum, required: true })
	content_type: BlogsContentTypeEnum

	@Prop({ type: [String], enum: BlogsCategoriesEnum, required: true })
	categories: BlogsCategoriesEnum[]

	@Prop({ type: String, required: true })
	main_image: string

	@Prop({ type: Summary, required: true })
	summary: Summary

	@Prop({ type: [Section], required: true })
	sections: Section[]

}

export const BlogSchema = SchemaFactory.createForClass(Blog)
