import {IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterExecutorDTO {
    @IsEmail()
    email!: string;

    @MinLength(6)
    password!: string;

    @IsString()
    city!: string;
}
