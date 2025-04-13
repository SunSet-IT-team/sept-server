import {IsInt, IsOptional, IsString, Min} from 'class-validator';

export class UpdateServiceDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    priority?: number;
}
