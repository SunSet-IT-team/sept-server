import {
    IsOptional,
    IsString,
    IsNumber,
    IsDateString,
    IsUUID,
} from 'class-validator';

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
    @IsUUID()
    addressId?: number;

    @IsOptional()
    @IsNumber()
    price?: number;
}
