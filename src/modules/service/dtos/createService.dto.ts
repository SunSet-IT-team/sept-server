import {IsString, IsInt, IsOptional, Min} from 'class-validator';

export class CreateServiceDTO {
    @IsString()
    name!: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    priority?: number;
}
