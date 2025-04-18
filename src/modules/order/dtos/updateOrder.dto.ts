import {
    IsOptional,
    IsString,
    IsNumber,
    IsEnum,
    IsDateString,
    Min,
    Max,
} from 'class-validator';
import {OrderStatus} from '@prisma/client';

export class UpdateOrderDTO {
    @IsOptional()
    @IsString()
    objectType?: string;

    @IsOptional()
    @IsString()
    comment?: string;

    @IsOptional()
    @IsNumber()
    distanceToSeptic?: number;

    @IsOptional()
    @IsNumber()
    septicDepth?: number;

    @IsOptional()
    @IsNumber()
    septicVolume?: number;

    @IsOptional()
    @IsString()
    septicConstructionType?: string;

    @IsOptional()
    @IsString()
    paymentMethod?: string;

    @IsOptional()
    @IsDateString()
    workDate?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsNumber()
    serviceId?: number;

    @IsOptional()
    @IsNumber()
    executorId?: number;

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsOptional()
    @IsNumber()
    @Min(0)
    priority?: number;
}
