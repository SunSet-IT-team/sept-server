import {prisma} from '../../../core/database/prisma';
import {ChatType, Role} from '@prisma/client';
import {getUserById} from '../../user/services/getUser';

export const getSupportChatService = async (
    userId: number,
    role: Role,
    orderId?: number,
    theme?: string | null
) => {
    if (![Role.CUSTOMER, Role.EXECUTOR, Role.ADMIN].includes(role)) {
        throw new Error(
            'Доступ разрешён только заказчику, исполнителю или админу'
        );
    }

    let finalTheme = theme?.trim();
    if (!finalTheme && orderId) {
        const order = await prisma.order.findUnique({
            where: {id: orderId},
            select: {id: true, service: {select: {name: true}}},
        });
        if (!order) throw new Error('Заказ не найден');

        finalTheme = `Заявка №${order.id}\nУслуга: ${
            order.service?.name ?? '—'
        }`;
    }

    const whereClause = {
        type: ChatType.ORDER_ADMIN,
        participants: {some: {userId}},
        ...(orderId && {orderId}),
    };

    let chat = await prisma.chat.findFirst({
        where: whereClause,
        include: {
            participants: true,
            messages: {orderBy: {createdAt: 'asc'}},
        },
    });

    if (chat) {
        if (finalTheme && chat.theme !== finalTheme) {
            chat = await prisma.chat.update({
                where: {id: chat.id},
                data: {theme: finalTheme},
                include: {
                    participants: true,
                    messages: {orderBy: {createdAt: 'asc'}},
                },
            });
        }
    } else {
        const admins = await prisma.user.findMany({
            where: {role: Role.ADMIN},
            select: {id: true},
        });
        if (!admins.length) throw new Error('В системе нет администраторов');

        chat = await prisma.chat.create({
            data: {
                type: ChatType.ORDER_ADMIN,
                orderId: orderId ?? null,
                theme: finalTheme ?? 'Чат поддержки',
                participants: {
                    create: [{userId}, ...admins.map((a) => ({userId: a.id}))],
                },
            },
            include: {
                participants: true,
                messages: {orderBy: {createdAt: 'asc'}},
            },
        });
    }

    const participants = await Promise.all(
        chat.participants.map(async (p) => ({
            ...p,
            user: await getUserById(p.userId),
        }))
    );

    return {...chat, participants};
};
