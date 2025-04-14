import {prisma} from '../../../core/database/prisma';
import {CreateOrderDTO} from '../dtos/createOrder.dto';
import {OrderStatus} from '@prisma/client';

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
        addressId,
        address, // строка
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

    if (addressId) {
        // Используем существующий адрес
        data.address = {
            connect: {
                id: addressId,
            },
        };
    } else if (address) {
        // Создаём новый адрес
        const newAddress = await prisma.address.create({
            data: {
                value: address,
                user: {
                    connect: {
                        userId: customerId,
                    },
                },
            },
        });

        data.address = {
            connect: {
                id: newAddress.id,
            },
        };
    }

    if (serviceId) {
        data.service = {
            connect: {
                id: serviceId,
            },
        };
    }

    return prisma.order.create({
        data,
        include: {
            service: true,
            address: true,
        },
    });
};
