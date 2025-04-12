import {IsEmail, IsString, Length} from 'class-validator';

export class LoginDTO {
    @IsEmail()
    email!: string;

    @IsString()
    password!: string;
}
