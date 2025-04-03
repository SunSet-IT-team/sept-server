import {IsNotEmpty, IsString, IsOptional, IsInt, Min} from 'class-validator';

export class CreateServiceDTO {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    priority?: number;
}
