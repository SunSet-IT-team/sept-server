import {AccountStatus} from '@prisma/client';
import {prisma} from '../../../db/prisma';

export async function deleteCustomer(id: number) {
    return prisma.$transaction(async (tx) => {
        // 1. Проверяем существование пользователя
        const user = await tx.user.findUnique({
            where: {id},
        });

        if (!user) {
            throw new Error('Пользователь не найден');
        }

        if (user.status === AccountStatus.DELETED) {
            throw new Error('Пользователь был удалён ранее');
        }

        // 2. Обновляем статус и анонимизируем данные
        return tx.user.update({
            where: {id},
            data: {
                status: AccountStatus.DELETED,
                email: `deleted-${Date.now()}-${user.id}@deleted.com`, // Уникальный email
                password: '', // Очищаем пароль
                code: null, // Очищаем код
                verificationCode: {delete: true}, // Удаляем код верификации
                // Дополнительно можно обновить профили:
            },
        });
    });
}
