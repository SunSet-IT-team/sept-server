import {prisma} from '../../../core/database/prisma';
import {OrderStatus} from '@prisma/client';
import {handleFileUpload} from '../utils/files/handleFileUpload';
import {toOrderDto} from '../utils/toOrder';
import {CompleteOrderDTO} from '../dtos/completeOrder.dto';

export const completeOrderService = async (
    orderId: number,
    executorId: number,
    dto: CompleteOrderDTO,
    files: Record<string, Express.Multer.File[]>
) => {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
    });

    if (!order) throw new Error('Заказ не найден');
    if (order.status !== OrderStatus.IN_PROGRESS) {
        throw new Error('Можно завершить только заказ в статусе IN_PROGRESS');
    }
    if (order.executorId !== executorId) {
        throw new Error('Вы не являетесь исполнителем этого заказа');
    }

    const report = await prisma.report.create({
        data: {
            orderId,
            total: Number(dto.total),
            text: '',
        },
    });

    if (files) {
        await handleFileUpload(files, executorId, report.id);
    }

    await prisma.executorProfile.update({
        where: {userId: executorId},
        data: {
            completedOrders: {
                increment: 1,
            },
        },
    });

    const updatedOrder = await prisma.order.update({
        where: {id: orderId},
        data: {
            status: OrderStatus.COMPLETED,
        },
        include: {
            service: true,
        },
    });

    const orderDto = await toOrderDto(updatedOrder);

    return {
        reportId: report.id,
        order: orderDto,
    };
};
