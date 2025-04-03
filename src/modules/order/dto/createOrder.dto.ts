import {IsInt, IsNotEmpty, IsString} from 'class-validator';

export class CreateOrderDTO {
    @IsInt()
    serviceId!: number;

    @IsString()
    @IsNotEmpty()
    city!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;
}
