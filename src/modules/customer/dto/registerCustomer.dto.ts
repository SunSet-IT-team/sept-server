import {IsEmail, IsNotEmpty, IsOptional, MinLength} from 'class-validator';

export class RegisterCustomerDTO {
    @IsEmail()
    email!: string;

    @MinLength(6)
    password!: string;

    @IsNotEmpty()
    address!: string;
}
