// dtos/updateCustomerAddress.dto.ts
import {
    IsOptional,
    IsString,
    IsInt,
    IsArray,
    ValidateNested,
    IsEmail,
} from 'class-validator';
import {Type} from 'class-transformer';

export class UpdateAddressItemDTO {
    @IsInt()
    id!: number;

    @IsOptional()
    @IsString()
    value?: string;

    @IsOptional()
    isDefault?: boolean;
}

export class NewAddressDTO {
    @IsString()
    value!: string;

    @IsOptional()
    isDefault?: boolean;
}

export class UpdateCustomerDTO {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => UpdateAddressItemDTO)
    updateAddresses?: UpdateAddressItemDTO[];

    @IsOptional()
    @IsArray()
    @Type(() => Number)
    deleteAddressIds?: number[];

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => NewAddressDTO)
    newAddresses?: NewAddressDTO[];

    // Для фото и прочего
    @IsOptional()
    @Type(() => Object)
    profilePhoto?: Express.Multer.File;
}
