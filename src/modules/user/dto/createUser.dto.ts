import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    IsNotEmpty,
} from "class-validator";
import { Role } from "@prisma/client";

export class CreateUserDTO {
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
