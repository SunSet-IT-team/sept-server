import {IsEmail, IsString, IsOptional, IsPhoneNumber} from 'class-validator';
import {Type} from 'class-transformer';
import {Express} from 'express';

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

    @IsString()
    address!: string;

    @IsOptional()
    @Type(() => Object)
    profilePhoto?: Express.Multer.File;
}
