import {IsOptional, IsString, MaxLength} from 'class-validator';

export class UpdateAdminDTO {
    @IsOptional()
    @IsString()
    @MaxLength(50)
    firstName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    lastName?: string;

    @IsOptional()
    @IsString()
    phone?: string;
}
