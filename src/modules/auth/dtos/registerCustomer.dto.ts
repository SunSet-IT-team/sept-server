import {
    IsEmail,
    IsString,
    IsOptional,
    IsNotEmpty,
    Matches,
    MinLength,
} from 'class-validator';
import {Type} from 'class-transformer';
import {Express} from 'express';

export class RegisterCustomerDTO {
    @IsEmail({}, {message: 'Некорректный email'})
    email!: string;

    @IsString()
    @MinLength(6, {message: 'Пароль должен быть минимум 6 символов'})
    password!: string;

    @IsString()
    @IsNotEmpty({message: 'Имя обязательно'})
    firstName!: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsString()
    @Matches(/^\+?[0-9]{10,15}$/, {message: 'Номер телефона некорректный'})
    phone!: string;

    @IsString()
    @IsNotEmpty({message: 'Адрес обязателен'})
    address!: string;

    @IsOptional()
    @Type(() => Object)
    profilePhoto?: Express.Multer.File;
}
