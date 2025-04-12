// modules/order/services/createOrder.service.ts
import {prisma} from '../../../core/database/prisma';
import {CreateOrderDTO} from '../dtos/createOrder.dto';
import {OrderStatus} from '@prisma/client';

export const createOrderService = async (
    dto: CreateOrderDTO,
    customerId: string
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
        addressId,
        serviceId,
        price,
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
        status: OrderStatus.PENDING,
        customer: {
            connect: {
                userId: customerId,
            },
        },
    };

    if (price) data.price = price;
    if (addressId) data.address = {connect: {id: addressId}};
    if (serviceId) data.service = {connect: {id: serviceId}};

    return prisma.order.create({
        data,
        include: {
            service: true,
            address: true,
        },
    });
};
