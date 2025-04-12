import {prisma} from '../../../core/database/prisma';
import {OrderStatus} from '@prisma/client';
import {handleFileUpload} from '../utils/files/handleFileUpload';

export const completeOrderService = async (
    orderId: string,
    executorId: string,
    dto: {text?: string},
    files: Record<string, Express.Multer.File[]>
) => {
    const order = await prisma.order.findUnique({
        where: {id: orderId},
        include: {executor: true},
    });

    const executor = await prisma.executorProfile.findUnique({
        where: {userId: executorId},
    });

    if (!order) throw new Error('Заказ не найден');
    if (order.status !== OrderStatus.IN_PROGRESS) {
        throw new Error('Можно завершить только заказ в статусе IN_PROGRESS');
    }
    if (order.executorId !== executor?.id) {
        throw new Error('Вы не являетесь исполнителем этого заказа');
    }

    const report = await prisma.report.create({
        data: {
            orderId,
            text: dto.text || '',
        },
    });

    if (files) {
        await handleFileUpload(files, order.executorId!, report.id);
    }

    await prisma.executorProfile.update({
        where: {id: order.executorId!},
        data: {completedOrders: {increment: 1}},
    });

    const updatedOrder = await prisma.order.update({
        where: {id: orderId},
        data: {
            status: OrderStatus.COMPLETED,
        },
    });

    return {
        message: 'Заказ завершён и отчёт прикреплён',
        reportId: report.id,
        order: updatedOrder,
    };
};
