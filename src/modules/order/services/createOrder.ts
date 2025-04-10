import {prisma} from '../../../db/prisma';
import {normalizeCity} from '../../../helpers/normalizeCity';
import {OrderStatus} from '@prisma/client';

interface CreateOrderData {
    customerId: number;
    serviceId: number;
    objectType: string;
    distanceToSeptic: number;
    septicDepth: number;
    septicVolume: number;
    septicConstructionType: string;
    paymentMethod: string;
    workDate: Date;
    comment?: string;
}

export async function createOrder(data: CreateOrderData) {
    // Валидация числовых полей
    if (data.distanceToSeptic <= 0) {
        throw new Error('Расстояние до септика должно быть положительным');
    }
    if (data.septicDepth <= 0) {
        throw new Error('Глубина септика должна быть положительной');
    }
    if (data.septicVolume <= 0) {
        throw new Error('Объём септика должен быть положительным');
    }

    console.log(data);

    return prisma.order.create({
        data: {
            customerId: data.customerId,
            serviceId: data.serviceId,
            objectType: data.objectType,
            distanceToSeptic: data.distanceToSeptic,
            septicDepth: data.septicDepth,
            septicVolume: data.septicVolume,
            septicConstructionType: data.septicConstructionType,
            paymentMethod: data.paymentMethod,
            workDate: data.workDate,
            comment: data.comment,
            status: OrderStatus.PENDING, // Устанавливаем статус по умолчанию
            priority: 100, // Приоритет по умолчанию
        },
        include: {
            customer: {
                select: {
                    id: true,
                    email: true,
                    customerProfile: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            service: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
}
