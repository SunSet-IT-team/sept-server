import {prisma} from '../../../core/database/prisma';
import {ChatType, Role} from '@prisma/client';

export const getSupportChatService = async (
    userId: number,
    role: Role,
    orderId?: number // делаем необязательным
) => {
    if (role !== Role.CUSTOMER && role !== Role.EXECUTOR) {
        throw new Error(
            'Только заказчик или исполнитель может обратиться в поддержку'
        );
    }

    const whereClause: any = {
        type: ChatType.ORDER_ADMIN,
        participants: {
            some: {userId},
        },
    };

    if (orderId) {
        whereClause.orderId = orderId;
    }

    const existing = await prisma.chat.findFirst({
        where: whereClause,
        include: {
            participants: {
                include: {user: true},
            },
        },
    });

    if (existing) return existing;

    const admins = await prisma.user.findMany({
        where: {role: Role.ADMIN},
        select: {id: true},
    });

    if (!admins.length) throw new Error('Нет администраторов для поддержки');

    const data: any = {
        type: ChatType.ORDER_ADMIN,
        participants: {
            create: [{userId}, ...admins.map((admin) => ({userId: admin.id}))],
        },
    };

    if (orderId) {
        data.orderId = orderId;
    }

    const chat = await prisma.chat.create({
        data,
        include: {
            participants: {
                include: {user: true},
            },
        },
    });

    return chat;
};
