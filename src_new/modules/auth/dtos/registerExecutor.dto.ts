import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    Matches,
} from 'class-validator';
import {Type} from 'class-transformer';

export class RegisterExecutorDTO {
    @IsEmail({}, {message: 'Некорректный email'})
    email!: string;

    @IsString()
    @MinLength(6, {message: 'Пароль должен быть минимум 6 символов'})
    password!: string;

    @IsString()
    @IsNotEmpty({message: 'Имя обязательно'})
    firstName!: string;

    @IsString()
    @IsNotEmpty({message: 'Фамилия обязательна'})
    lastName!: string;

    @IsString()
    @Matches(/^\+?[0-9]{10,15}$/, {message: 'Номер телефона некорректный'})
    phone!: string;

    @IsString()
    @IsNotEmpty({message: 'Формат работы обязателен'})
    workFormat!: string;

    @IsOptional()
    @IsString()
    experience?: string;

    @IsOptional()
    @IsString()
    about?: string;

    @IsOptional()
    @IsString()
    companyName?: string;

    // Не валидируем файлы как обычные поля — они приходят отдельно через multer
    @Type(() => Object)
    files!: Record<string, Express.Multer.File[]>;
}
