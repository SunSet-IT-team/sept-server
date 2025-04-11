import {IsEmail, IsString, Length} from 'class-validator';

export class VerifyCodeDto {
    @IsEmail()
    email!: string;

    @IsString()
    code!: string;
}
