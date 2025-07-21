import { ContactFormDto } from './dto/contact-form.dto';
export declare class ContactService {
    private transporter;
    createHtmlMessage(dto: ContactFormDto): string;
    sendToGal(dto: ContactFormDto): Promise<ContactFormDto>;
}
