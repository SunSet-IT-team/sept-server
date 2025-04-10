import {
    IsInt,
    IsNotEmpty,
    IsString,
    IsNumber,
    Min,
    IsDateString,
    IsIn,
    IsOptional,
} from 'class-validator';
import {OrderStatus} from '@prisma/client';

export class CreateOrderDTO {
    @IsInt()
    @Min(1)
    serviceId!: number;

    @IsString()
    @IsNotEmpty()
    objectType!: string;

    @IsNumber()
    @Min(0.1, {message: 'Расстояние до септика должно быть положительным'})
    distanceToSeptic!: number;

    @IsNumber()
    @Min(0.1, {message: 'Глубина септика должна быть положительной'})
    septicDepth!: number;

    @IsNumber()
    @Min(0.1, {message: 'Объём септика должен быть положительным'})
    septicVolume!: number;

    @IsString()
    @IsNotEmpty()
    septicConstructionType!: string;

    @IsString()
    @IsNotEmpty()
    paymentMethod!: string;

    @IsDateString()
    workDate!: string; // Принимаем строку, которая будет преобразована в Date

    @IsString()
    @IsOptional()
    comment?: string;

    // Эти поля могут быть добавлены, если они устанавливаются автоматически
    @IsIn(Object.values(OrderStatus))
    @IsOptional()
    status?: OrderStatus;

    @IsInt()
    @IsOptional()
    priority?: number;
}
