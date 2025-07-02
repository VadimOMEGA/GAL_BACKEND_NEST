import { IsOptional, IsString } from "class-validator";

export class AdminDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    password?: string;
}