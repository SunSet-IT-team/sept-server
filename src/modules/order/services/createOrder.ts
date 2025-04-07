import {prisma} from '../../../db/prisma';
import {normalizeCity} from '../../../helpers/normalizeCity';

export async function createOrder(data: {
    customerId: number;
    serviceId: number;
    city: string;
    description: string;
}) {
    return prisma.order.create({
        data: {
            customerId: data.customerId,
            serviceId: data.serviceId,
            city: normalizeCity(data.city),
            description: data.description,
        },
    });
}
