import {
    IsOptional,
    IsString,
    IsInt,
    Min,
    MaxLength,
    IsEnum,
    Matches,
    IsArray,
    IsUUID,
    IsNumber,
    IsEmail,
} from 'class-validator';
import {WorkFormat} from '@prisma/client';

export class UpdateExecutorDTO {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @Matches(/^[+\d\s\-()]+$/, {message: 'Некорректный номер телефона'})
    phone?: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    about?: string;

    @IsOptional()
    experience?: number;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    companyName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    city?: string;

    @IsOptional()
    @IsEnum(WorkFormat, {
        message:
            'workFormat должен быть одним из: INDIVIDUAL, LEGAL_ENTITY, SOLE_PROPRIETOR',
    })
    workFormat?: WorkFormat;

    @IsOptional()
    @IsArray()
    fileIdsToDelete?: number[];

    @IsOptional()
    profilePhoto?: any;

    @IsOptional()
    registrationDoc?: any;

    @IsOptional()
    licenseDoc?: any;
}
