// src/modules/auth/services/forgotPassword.service.ts
import {prisma} from '../../../core/database/prisma';
import {generateVerificationCode} from '../utils/generateVerificationCode';
import {sendEmail} from '../../../core/utils/email/sendEmail';
import {recoveryPassword} from '../../../core/utils/email/templates/recoveryPassword';

export const forgotPasswordService = async (email: string) => {
    const user = await prisma.user.findUnique({where: {email}});
    if (!user) throw new Error('Пользователь с таким email не найден');

    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.emailVerification.upsert({
        where: {userId: user.id},
        create: {
            userId: user.id,
            code,
            expiresAt,
            used: false,
        },
        update: {
            code,
            expiresAt,
            used: false,
        },
    });

    await sendEmail(
        user.email,
        'Восстановление пароля',
        recoveryPassword(code)
    );
};
