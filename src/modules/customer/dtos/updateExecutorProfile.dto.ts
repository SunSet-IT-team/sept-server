import {IsOptional, IsString, MaxLength, Matches} from 'class-validator';

export class UpdateCustomerDTO {
    @IsOptional()
    @IsString()
    @MaxLength(50)
    firstName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    lastName?: string;

    @IsOptional()
    @IsString()
    @Matches(/^[+\d\s\-()]+$/, {message: 'Некорректный номер телефона'})
    phone?: string;
}
