import {IsEmail, IsString, IsOptional, IsPhoneNumber} from 'class-validator';

export class RegisterCustomerDTO {
    @IsEmail()
    email!: string;

    @IsString()
    password!: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsString()
    address!: string;
}
