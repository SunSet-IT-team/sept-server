import {IsString, IsOptional} from 'class-validator';

export class CreateOrderDTO {
    @IsString()
    objectType!: string;

    @IsOptional()
    @IsString()
    comment?: string;

    @IsString()
    distanceToSeptic!: string;

    @IsString()
    septicDepth!: string;

    @IsString()
    septicVolume!: string;

    @IsString()
    septicConstructionType!: string;

    @IsString()
    paymentMethod!: string;

    @IsString()
    workDate!: string;

    @IsString()
    city!: string;

    @IsString()
    address!: string;

    @IsString()
    serviceId!: string;

    @IsString()
    executorId!: string;

    @IsOptional()
    @IsString()
    price?: string;
}
