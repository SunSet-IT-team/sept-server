// modules/order/dtos/createOrder.dto.ts
import {
    IsString,
    IsNumber,
    IsOptional,
    IsUUID,
    IsDateString,
    IsEnum,
} from 'class-validator';

export class CreateOrderDTO {
    @IsString()
    objectType!: string;

    @IsOptional()
    @IsString()
    comment?: string;

    @IsNumber()
    distanceToSeptic!: number;

    @IsNumber()
    septicDepth!: number;

    @IsNumber()
    septicVolume!: number;

    @IsString()
    septicConstructionType!: string;

    @IsString()
    paymentMethod!: string;

    @IsDateString()
    workDate!: string;

    @IsOptional()
    @IsUUID()
    addressId?: string;

    @IsOptional()
    @IsUUID()
    serviceId?: string;

    @IsOptional()
    @IsNumber()
    price?: number;
}
