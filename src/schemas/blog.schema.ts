import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { AuthenticLocalCategoriesEnum, BlogsCategoriesEnum, BlogsContentTypeEnum } from 'src/enums/blog.enum'
import { MultiLangText } from './shared/text.schema'

export type BlogDocument = HydratedDocument<Blog>

// Helper classes

@Schema({ _id: false })
export class Image {
    @Prop({ type: String, required: true })
    url_1: string

	@Prop({ type: String, required: false })
    url_2?: string
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

	@Prop({ type: [Image], required: false })
	images: Image[]
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

	@Prop({ type: String, enum: AuthenticLocalCategoriesEnum, required: false })
	authentic_local_category?: AuthenticLocalCategoriesEnum

	@Prop({ type: String, required: true })
	main_image: string

	@Prop({ type: Summary, required: true })
	summary: Summary

	@Prop({ type: [Section], required: true })
	sections: Section[]

}

export const BlogSchema = SchemaFactory.createForClass(Blog)
