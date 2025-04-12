import {prisma} from '../../../core/database/prisma';
import {AccountStatus} from '@prisma/client';
import {sendEmail} from '../../../core/utils/email/sendEmail';
import {verificationEmail} from '../../../core/utils/email/templates/verificationEmail';
import {generateVerificationCode} from '../utils/generateVerificationCode';

export const resendVerificationService = async (
    email: string
): Promise<{message: string}> => {
    const user = await prisma.user.findUnique({
        where: {email},
        include: {emailVerification: true},
    });

    if (!user) {
        throw new Error('Пользователь с таким email не найден');
    }

    if (user.status === AccountStatus.VERIFIED) {
        throw new Error('Email уже подтверждён');
    }

    const newCode = generateVerificationCode();

    await prisma.emailVerification.upsert({
        where: {userId: user.id},
        update: {
            code: newCode,
            used: false,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        },
        create: {
            userId: user.id,
            code: newCode,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        },
    });

    await sendEmail(
        user.email,
        'Подтверждение почты',
        verificationEmail(newCode)
    );

    return {
        message: 'Код подтверждения был отправлен повторно на email',
    };
};
