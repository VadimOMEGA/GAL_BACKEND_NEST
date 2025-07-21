import { ContactService } from './contact.service';
import { ContactFormDto } from './dto/contact-form.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    send(dto: ContactFormDto): Promise<ContactFormDto>;
}
