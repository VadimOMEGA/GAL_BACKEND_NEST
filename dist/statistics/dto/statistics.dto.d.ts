import { MultiLangTextDto } from 'src/blogs/dto/multiLangText.dto';
import { ExecutiveMemberDto } from './executive-member.dto';
export declare class StatisticsDto {
    title: MultiLangTextDto;
    image: string;
    projects_number: number;
    activity_years: number;
    population: number;
    total_members: number;
    total_added_members: number;
    business_members: number;
    public_members: number;
    civic_members: number;
    executive_members: ExecutiveMemberDto[];
}
