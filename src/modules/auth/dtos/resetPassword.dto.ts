import {IsEmail, IsString, Length} from 'class-validator';

export class ResetPasswordDTO {
    @IsEmail()
    email!: string;

    @IsString()
    code!: string;

    @IsString()
    @Length(8, 128)
    newPassword!: string;
}
