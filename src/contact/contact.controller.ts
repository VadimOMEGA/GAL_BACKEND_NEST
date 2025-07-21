import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ContactService } from './contact.service'
import { ContactFormDto } from './dto/contact-form.dto'

@Controller('contact')
export class ContactController {
	constructor(private readonly contactService: ContactService) {}

	@Post('send')
	@UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true }))
	@HttpCode(200)
	async send(@Body() dto: ContactFormDto) {
		const response = await this.contactService.sendToGal(dto)
    
		return response
	}
}
