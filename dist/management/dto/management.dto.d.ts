import { PresidentDto } from './president.dto';
import { CommitteeDto } from './committee.dto';
import { ExecutiveDto } from './executive.dto';
import { GeneralAssemblyDto } from './general-assembly.dto';
import { AdministrationDto } from './administration.dto';
import { CensorshipDto } from './censorship.dto';
export declare class ManagementDto {
    image: string;
    president: PresidentDto;
    executive: ExecutiveDto;
    general_assembly: GeneralAssemblyDto;
    administration: AdministrationDto;
    committee: CommitteeDto;
    censorship: CensorshipDto;
}
