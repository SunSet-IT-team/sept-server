import {IsString, MinLength} from 'class-validator';

export class UpdateExecutorDTO {
    @IsString()
    @MinLength(2)
    city!: string;
}
