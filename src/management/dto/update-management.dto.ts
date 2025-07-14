import { PartialType } from "@nestjs/mapped-types";
import { ManagementDto } from "./management.dto";

export class UpdateManagementDto extends PartialType(ManagementDto) {}