import {IsString, MinLength} from 'class-validator';

export class ChangePasswordDTO {
    @IsString()
    oldPassword!: string;

    @IsString()
    @MinLength(6, {message: 'Пароль должен содержать минимум 6 символов'})
    newPassword!: string;
}
