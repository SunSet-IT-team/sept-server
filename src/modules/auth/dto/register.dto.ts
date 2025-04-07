import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import {Role} from '@prisma/client';

export class RegisterDTO {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;

    @IsEnum(Role)
    role!: Role;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    address?: string;
}
