import {IsOptional, IsString, MaxLength} from 'class-validator';

export class CompleteOrderDTO {
    @IsOptional()
    @IsString()
    @MaxLength(2000)
    text?: string;
}
