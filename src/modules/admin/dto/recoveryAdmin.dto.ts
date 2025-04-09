import {IsNotEmpty, IsString, MinLength} from 'class-validator';

export class RecoveryAdminDTO {
    @IsString()
    code!: string;

    @IsNotEmpty()
    @MinLength(8)
    newPassword!: string;

    @IsNotEmpty()
    @MinLength(8)
    confirmPassword!: string;
}
