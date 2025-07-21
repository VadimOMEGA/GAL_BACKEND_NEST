import { IsEmail, IsString } from "class-validator"

export class ContactFormDto {
    @IsString()
	subject: string

    @IsString()
	name: string

    @IsString()
    surname: string

    @IsEmail()
	email: string

    @IsString()
	message: string

    @IsString()
	phone: string
}
