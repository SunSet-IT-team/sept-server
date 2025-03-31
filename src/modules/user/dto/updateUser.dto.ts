import {IsEmail, IsOptional, IsString} from 'class-validator';

export class UpdateUserDTO {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    address?: string; // только для CUSTOMER

    @IsOptional()
    @IsString()
    city?: string; // только для EXECUTOR
}
