import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { MultiLangText } from './shared/text.schema'

export type StatisticsDocument = HydratedDocument<Statistics>

@Schema({ _id: false })
export class ExecutiveMember {
    @Prop({ type: String, required: true })
    image: string

    @Prop({ type: MultiLangText, required: true })
    name: MultiLangText

    @Prop({ type: MultiLangText, required: true })
    position: MultiLangText

}

@Schema({ timestamps: true, collection: 'statistics' })
export class Statistics {
	@Prop({ type: MultiLangText, required: true })
	title: MultiLangText

    @Prop({ type: String, required: true })
    image: string

    @Prop({ type: Number, required: true })
    projects_number: number

    @Prop({ type: Number, required: true })
    activity_years: number

    @Prop({ type: Number, required: true })
    population: number

    @Prop({ type: Number, required: true })
    total_members: number

    @Prop({ type: Number, required: true })
    total_added_members: number

    @Prop({ type: Number, required: true })
    business_members: number

    @Prop({ type: Number, required: true })
    public_members: number

    @Prop({ type: Number, required: true })
    civic_members: number

    @Prop({ type: [ExecutiveMember], required: true })
    executive_members: ExecutiveMember[]
}

export const StatisticsSchema = SchemaFactory.createForClass(Statistics)