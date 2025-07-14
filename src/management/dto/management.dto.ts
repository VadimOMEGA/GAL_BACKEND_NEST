import { IsObject, IsString, ValidateIf, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { PresidentDto } from './president.dto'
import { CommitteeDto } from './committee.dto'
import { ExecutiveDto } from './executive.dto'
import { GeneralAssemblyDto } from './general-assembly.dto'
import { AdministrationDto } from './administration.dto'
import { CensorshipDto } from './censorship.dto'

export class ManagementDto {
  @IsString()
  image: string

  @IsObject()
  @ValidateNested()
  @Type(() => PresidentDto)
  president: PresidentDto

  @IsObject()
  @ValidateNested()
  @Type(() => ExecutiveDto)
  executive: ExecutiveDto

  @IsObject()
  @ValidateNested()
  @Type(() => GeneralAssemblyDto)
  general_assembly: GeneralAssemblyDto

  @IsObject()
  @ValidateNested()
  @Type(() => AdministrationDto)
  administration: AdministrationDto

  @IsObject()
  @ValidateNested()
  @Type(() => CommitteeDto)
  committee: CommitteeDto

  @IsObject()
  @ValidateNested()
  @Type(() => CensorshipDto)
  censorship: CensorshipDto
}