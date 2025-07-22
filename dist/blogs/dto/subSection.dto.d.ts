import { MultiLangTextDto } from './multiLangText.dto';
import { ImageDto } from './image.dto';
export declare class SubSectionDto {
    title: MultiLangTextDto;
    column1: MultiLangTextDto;
    column2?: MultiLangTextDto;
    images?: ImageDto[];
}
