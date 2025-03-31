import {IsEnum} from 'class-validator';
import {OrderStatus} from '@prisma/client';

export class UpdateStatusDTO {
    @IsEnum(OrderStatus)
    status!: OrderStatus;
}
