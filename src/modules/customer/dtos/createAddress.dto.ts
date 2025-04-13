import {IsString, IsOptional, IsBoolean, MaxLength} from 'class-validator';

export class CreateAddressDTO {
    @IsString()
    @MaxLength(255)
    value!: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    postalCode?: string;

    @IsOptional()
    @IsString()
    coordinates?: string;

    @IsOptional()
    @IsBoolean()
    isDefault?: boolean;
}
