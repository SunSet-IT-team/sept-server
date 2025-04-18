// src/modules/auth/services/resetPassword.service.ts
import {prisma} from '../../../core/database/prisma';
import {hashPassword} from '../utils/hashPassword';

export const resetPasswordService = async (
    email: string,
    code: string,
    newPassword: string
) => {
    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
        throw new Error('Пользователь с таким email не найден');
    }

    const record = await prisma.emailVerification.findFirst({
        where: {
            userId: user.id,
            code,
        },
    });
    if (!record) {
        throw new Error('Неверный код или email');
    }
    if (record.used) {
        throw new Error('Код уже использован');
    }
    if (record.expiresAt < new Date()) {
        throw new Error('Срок действия кода истёк');
    }

    // 3) Обновить пароль
    const hashed = await hashPassword(newPassword);
    await prisma.user.update({
        where: {id: user.id},
        data: {password: hashed},
    });

    // 4) Пометить код как использованный
    await prisma.emailVerification.update({
        where: {id: record.id},
        data: {used: true},
    });
};
