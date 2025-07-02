import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TAdmin = HydratedDocument<Admin>

@Schema()
export class Admin {
	@Prop({ type: String, required: true })
	username: string

	@Prop({ type: String, required: true })
	password: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin)
