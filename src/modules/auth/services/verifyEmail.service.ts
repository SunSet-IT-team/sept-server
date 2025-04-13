import {prisma} from '../../../core/database/prisma';
import {AccountStatus} from '@prisma/client';

export const verifyEmailService = async (
    code: string,
    email: string
): Promise<{message: string; userId: string}> => {
    const emailVerification = await prisma.emailVerification.findFirst({
        where: {
            code,
            user: {
                email,
            },
        },
        include: {user: true},
    });

    if (!emailVerification) {
        throw new Error('Неверный код или email');
    }

    if (emailVerification.used) {
        throw new Error('Код уже был использован');
    }

    if (new Date() > emailVerification.expiresAt) {
        throw new Error('Срок действия кода истек');
    }

    const user = emailVerification.user;

    if (!user) {
        throw new Error('Пользователь не найден');
    }

    if (['BANNED', 'DELETED'].includes(user.status as string)) {
        throw new Error(
            'Нельзя подтвердить заблокированный или удалённый аккаунт'
        );
    }

    if (user.status === AccountStatus.VERIFIED) {
        throw new Error('Email уже подтверждён');
    }

    await prisma.user.update({
        where: {id: user.id},
        data: {
            status: AccountStatus.VERIFIED,
            statusUpdatedAt: new Date(),
        },
    });

    await prisma.emailVerification.update({
        where: {id: emailVerification.id},
        data: {
            used: true,
        },
    });

    return {
        message: 'Email успешно подтверждён',
        userId: user.id,
    };
};
