import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MultiLangText } from "./shared/text.schema";

export type DocumentsDocument = HydratedDocument<Documents>

@Schema({ _id: false })
export class Regulations {
    @Prop({ type: MultiLangText, required: true })
    text: MultiLangText

    @Prop({ type: String, required: true})
    file: string
}

@Schema({ _id: false })
export class Statuses {
    @Prop({ type: MultiLangText, required: true })
    text: MultiLangText

    @Prop({ type: String, required: true })
    file: string
}

@Schema({ _id: false })
export class Strategies {
    @Prop({ type: MultiLangText, required: true })
    text: MultiLangText

    @Prop({ type: String, required: true })
    file: string
}

@Schema({ _id: false })
export class Agreements {
    @Prop({ type: MultiLangText, required: true })
    text: MultiLangText

    @Prop({ type: String, required: true })
    file: string
}

@Schema({ _id: false })
export class Reports {
    @Prop({ type: MultiLangText, required: true })
    text: MultiLangText

    @Prop({ type: String, required: true })
    file: string
}

@Schema({ timestamps: true, collection: 'documents' })
export class Documents {
    @Prop({ type: String, required: true })
	main_image: string

    @Prop({ type: [Regulations], required: true })
    regulations: Regulations[]

    @Prop({ type: [Statuses], required: true })
    statuses: Statuses[]

    @Prop({ type: [Strategies], required: true })
    strategies: Strategies[]

    @Prop({ type: [Agreements], required: true })
    agreements: Agreements[]

    @Prop({ type: [Reports], required: true })
    reports: Reports[]
}

export const DocumentsSchema = SchemaFactory.createForClass(Documents)
