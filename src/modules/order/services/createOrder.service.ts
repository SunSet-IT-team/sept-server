import {prisma} from '../../../core/database/prisma';
import {CreateOrderDTO} from '../dtos/createOrder.dto';
import {OrderStatus} from '@prisma/client';
import {toOrderDto} from '../utils/toOrder';

export const createOrderService = async (
    dto: CreateOrderDTO,
    customerId: number
) => {
    const {
        objectType,
        comment,
        distanceToSeptic,
        septicDepth,
        septicVolume,
        septicConstructionType,
        paymentMethod,
        workDate,
        city,
        serviceId,
        executorId,
        price,
        address, // 👈 добавили адрес
    } = dto;

    const data: any = {
        objectType,
        comment,
        distanceToSeptic,
        septicDepth,
        septicVolume,
        septicConstructionType,
        paymentMethod,
        workDate: new Date(workDate),
        city,
        address: address ?? '', // 👈 сюда добавили текст адреса
        status: OrderStatus.PENDING,
        priority: 100,
        customer: {
            connect: {id: customerId},
        },
        executor: {
            connect: {id: executorId},
        },
    };

    if (price) {
        data.price = price;
    }

    if (serviceId) {
        data.service = {
            connect: {
                id: serviceId,
            },
        };
    }

    const order = await prisma.order.create({
        data,
        include: {
            service: true,
            customer: true,
            executor: true,
        },
    });

    const orderDto = await toOrderDto(order);
    return orderDto;
};
