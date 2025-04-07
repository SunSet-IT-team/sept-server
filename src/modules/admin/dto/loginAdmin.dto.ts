import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LoginAdminDTO {
    @IsString()
    email!: string;

    @IsNotEmpty()
    password!: string;
}
