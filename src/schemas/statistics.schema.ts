import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { MultiLangText } from './shared/text.schema'

export type StatisticsDocument = HydratedDocument<Statistics>

@Schema({ timestamps: true, collection: 'statistics' })
export class Statistics {
	@Prop({ type: MultiLangText, required: true })
	title: MultiLangText

    @Prop({ type: String, required: true })
    image: string

    @Prop({ type: String, required: true })
    projects_number: string

    @Prop({ type: String, required: true })
    activity_years: string

    @Prop({ type: String, required: true })
    population: string

    @Prop({ type: String, required: true })
    total_members: string

    @Prop({ type: String, required: true })
    total_added_members: string

    @Prop({ type: String, required: true })
    business_members: string

    @Prop({ type: String, required: true })
    public_members: string

    @Prop({ type: String, required: true })
    civic_members: string
}

export const StatisticsSchema = SchemaFactory.createForClass(Statistics)