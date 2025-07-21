import { IsEmail, IsPhoneNumber, IsString } from "class-validator"

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

    @IsPhoneNumber()
	phone: string
}
