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
} from 'class-validator';
import {WorkFormat} from '@prisma/client';

export class UpdateExecutorDTO {
    @IsOptional()
    @IsString()
    @MaxLength(50)
    firstName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    lastName?: string;

    @IsOptional()
    @IsString()
    @Matches(/^[+\d\s\-()]+$/, {message: 'Некорректный номер телефона'})
    phone?: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    about?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
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
    @IsEnum(WorkFormat, {
        message:
            'workFormat должен быть одним из: INDIVIDUAL, LEGAL_ENTITY, SOLE_PROPRIETOR',
    })
    workFormat?: WorkFormat;

    @IsOptional()
    @IsArray()
    @IsUUID('all', {each: true})
    fileIdsToDelete?: string[];

    @IsOptional()
    profilePhoto?: any;

    @IsOptional()
    registrationDoc?: any;

    @IsOptional()
    licenseDoc?: any;
}
