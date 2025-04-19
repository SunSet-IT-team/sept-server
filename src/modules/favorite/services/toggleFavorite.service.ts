import {prisma} from '../../../core/database/prisma';
import {Role} from '@prisma/client';
import {getUserById} from '../../user/services/getUser';
import {UserDto} from '../../user/dto/user.dto';

interface ToggleFavoriteData {
    userId: number;
    executorId: number;
}

export interface ToggleFavoriteResult {
    message: string;
    favorited: boolean;
    executor: UserDto;
}

export const toggleFavoriteService = async ({
    userId,
    executorId,
}: ToggleFavoriteData): Promise<ToggleFavoriteResult> => {
    const customer = await prisma.user.findUnique({where: {id: userId}});
    if (!customer || customer.role !== Role.CUSTOMER) {
        throw new Error(
            'Только заказчик может управлять избранным исполнителей'
        );
    }

    const executorUser = await prisma.user.findUnique({
        where: {id: executorId},
    });
    if (!executorUser || executorUser.role !== Role.EXECUTOR) {
        throw new Error('Исполнитель не найден');
    }

    const existing = await prisma.favorite.findUnique({
        where: {
            customerId_executorId: {customerId: userId, executorId},
        },
    });

    let message: string;
    let favorited: boolean;

    if (existing) {
        await prisma.favorite.delete({
            where: {
                customerId_executorId: {customerId: userId, executorId},
            },
        });
        message = 'Удалено из избранного';
        favorited = false;
    } else {
        await prisma.favorite.create({
            data: {customerId: userId, executorId},
        });
        message = 'Добавлено в избранное';
        favorited = true;
    }

    const executorDto = await getUserById(executorId);

    return {message, favorited, executor: executorDto};
};
