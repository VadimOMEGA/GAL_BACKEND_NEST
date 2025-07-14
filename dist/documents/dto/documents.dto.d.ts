import { RegulationsDto } from "./regulations.dto";
import { StatusesDto } from "./statuses.dto";
import { StrategiesDto } from "./strategies.dto";
import { AgreementsDto } from "./agreements.dto";
import { ReportsDto } from "./reports.dto";
export declare class DocumentsDto {
    main_image: string;
    regulations: RegulationsDto[];
    statuses: StatusesDto[];
    strategies: StrategiesDto[];
    agreements: AgreementsDto[];
    reports: ReportsDto[];
}
