import { Type } from "class-transformer"
import { IsArray, IsString, ValidateNested } from "class-validator"
import { RegulationsDto } from "./regulations.dto"
import { StatusesDto } from "./statuses.dto"
import { StrategiesDto } from "./strategies.dto"
import { AgreementsDto } from "./agreements.dto"
import { ReportsDto } from "./reports.dto"

export class DocumentsDto {
	@IsString()
	main_image: string

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RegulationsDto)
	regulations: RegulationsDto[]

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => StatusesDto)
	statuses: StatusesDto[]

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => StrategiesDto)
	strategies: StrategiesDto[]

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AgreementsDto)
	agreements: AgreementsDto[]

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ReportsDto)
	reports: ReportsDto[]
}
