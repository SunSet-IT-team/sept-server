import {IsString, IsOptional, MinLength} from 'class-validator';

export class UpdateCustomerDTO {
    @IsOptional()
    @IsString()
    @MinLength(5, {message: 'Адрес должен содержать минимум 5 символов'})
    address?: string;
}
