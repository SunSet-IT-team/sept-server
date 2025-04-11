import {prisma} from '../../../core/database/prisma';
import {sendVerificationEmail} from '../utils/email';
import {generateVerificationCode} from '../utils/generateVerificationCode';

export const sendVerificationCodeService = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {email},
    });

    if (!user) {
        throw new Error('Пользователь не найден');
    }

    const verificationCode = generateVerificationCode();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    await prisma.emailVerification.upsert({
        where: {userId: user.id},
        update: {code: verificationCode, expiresAt, used: false},
        create: {userId: user.id, code: verificationCode, expiresAt},
    });

    await sendVerificationEmail(user.email, verificationCode);

    return {message: 'Код подтверждения отправлен на email'};
};
