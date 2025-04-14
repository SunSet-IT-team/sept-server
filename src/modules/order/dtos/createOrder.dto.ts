import {
    IsString,
    IsNumber,
    IsOptional,
    IsUUID,
    IsDateString,
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
    addressId?: number;

    @IsOptional()
    address?: string;

    @IsOptional()
    serviceId?: number;

    @IsOptional()
    @IsNumber()
    price?: number;
}
