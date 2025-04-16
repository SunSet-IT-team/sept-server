import {IsString, IsNumber, IsOptional, IsDateString} from 'class-validator';

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

    @IsString()
    city!: string;

    @IsString()
    address!: string;

    @IsNumber()
    serviceId!: number;

    @IsNumber()
    executorId!: number;

    @IsOptional()
    @IsNumber()
    price?: number;
}
