// dtos/executor.dto.ts
import {
    IsOptional,
    IsString,
    IsPhoneNumber,
    IsEmail,
    Length,
    IsInt,
    Min,
} from 'class-validator';

export class UpdateExecutorProfileDTO {
    @IsOptional()
    @IsString()
    @Length(2, 50)
    firstName?: string;

    @IsOptional()
    @IsString()
    @Length(2, 50)
    lastName?: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @Length(10, 500)
    about?: string;

    @IsOptional()
    @IsString()
    companyName?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    experience?: number;
}
