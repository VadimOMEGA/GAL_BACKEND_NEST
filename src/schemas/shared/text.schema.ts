import { Prop, Schema } from "@nestjs/mongoose"

@Schema({ _id: false })
export class MultiLangText {
    @Prop({ type: String, required: true })
    ro: string

    @Prop({ type: String, required: true })
    ru: string

    @Prop({ type: String, required: true })
    en: string
}