import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    Matches,
    IsEnum,
    IsNumberString,
} from 'class-validator';
import {Type} from 'class-transformer';
import {WorkFormat} from '@prisma/client';

export class RegisterExecutorDTO {
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

    @IsEnum(WorkFormat, {message: 'Недопустимый формат работы'})
    workFormat!: WorkFormat;

    @IsString()
    @IsNotEmpty({message: 'Опыт обязателен'})
    @IsNumberString({}, {message: 'Опыт должен быть числом'})
    experience!: string;

    @IsString()
    @IsNotEmpty({message: 'Город обязателен'})
    city!: string;

    @IsOptional()
    @IsString()
    about?: string;

    @IsOptional()
    @IsString()
    companyName?: string;

    // Файлы — приходят через multer, поэтому не валидируем содержимое
    @IsOptional()
    @Type(() => Object)
    profilePhoto!: Express.Multer.File;

    @IsOptional()
    @Type(() => Object)
    registrationDoc!: Express.Multer.File;

    @IsOptional()
    @Type(() => Object)
    licenseDoc!: Express.Multer.File;
}
