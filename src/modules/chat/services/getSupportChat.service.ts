import {prisma} from '../../../core/database/prisma';
import {ChatType, Role} from '@prisma/client';

export const getSupportChatService = async (
    userId: number,
    role: Role,
    orderId: number
) => {
    if (role !== Role.CUSTOMER && role !== Role.EXECUTOR) {
        throw new Error(
            'Только заказчик или исполнитель может обратиться в поддержку'
        );
    }

    const existing = await prisma.chat.findFirst({
        where: {
            type: ChatType.ORDER_ADMIN,
            orderId,
            participants: {
                some: {userId},
            },
        },
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

    const chat = await prisma.chat.create({
        data: {
            type: ChatType.ORDER_ADMIN,
            orderId,
            participants: {
                create: [
                    {userId},
                    ...admins.map((admin) => ({userId: admin.id})),
                ],
            },
        },
        include: {
            participants: {
                include: {user: true},
            },
        },
    });

    return chat;
};
