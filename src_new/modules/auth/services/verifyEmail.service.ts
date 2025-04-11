import {prisma} from '../../../core/database/prisma';
import {AccountStatus} from '@prisma/client';

export const verifyEmailService = async (code: string): Promise<void> => {
    const emailVerification = await prisma.emailVerification.findFirst({
        where: {code},
        include: {user: true},
    });

    if (!emailVerification) {
        throw new Error('Неверный код верификации');
    }

    if (emailVerification.used) {
        throw new Error('Код уже был использован');
    }

    if (new Date() > emailVerification.expiresAt) {
        throw new Error('Срок действия кода истек');
    }

    await prisma.user.update({
        where: {id: emailVerification.userId},
        data: {status: AccountStatus.VERIFIED},
    });

    await prisma.emailVerification.update({
        where: {id: emailVerification.id},
        data: {used: true},
    });
};
