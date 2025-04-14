// modules/chat/dtos/GetChatsQuery.dto.ts
import {IsOptional, IsEnum, IsInt, Min, IsString} from 'class-validator';
import {ChatType} from '@prisma/client';

export class GetChatsQueryDTO {
    @IsOptional()
    @IsEnum(ChatType, {
        message: 'Недопустимый тип чата',
    })
    type?: ChatType;

    @IsOptional()
    @IsString()
    orderId?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number;
}
