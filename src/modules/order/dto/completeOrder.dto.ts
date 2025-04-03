import {IsString, MinLength} from 'class-validator';

export class CompleteOrderDTO {
    @IsString()
    @MinLength(5, {message: 'Отчёт должен содержать минимум 5 символов'})
    report!: string;
}
