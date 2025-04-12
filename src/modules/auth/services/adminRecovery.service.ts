import {prisma} from '../../../core/database/prisma';
import {sendEmail} from '../../../core/utils/email/sendEmail';
import {recoveryEmail} from '../../../core/utils/email/templates/recoveryEmail';
import {generateVerificationCode} from '../utils/generateVerificationCode';
import {hashPassword} from '../utils/hashPassword';

export const adminRecoveryService = async (
    email: string,
    code: string,
    newPassword: string
): Promise<{message: string; userId: string}> => {
    const admin = await prisma.adminProfile.findFirst({
        where: {
            user: {
                email,
            },
        },
        include: {
            user: true,
        },
    });

    if (!admin) {
        throw new Error('Админ с таким email не найден');
    }

    if (admin.recoveryCode !== code) {
        throw new Error('Неверный код восстановления');
    }

    if (newPassword.length < 6) {
        throw new Error('Пароль должен содержать минимум 6 символов');
    }

    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = await prisma.user.update({
        where: {id: admin.userId},
        data: {
            password: hashedPassword,
        },
    });

    const newRecoveryCode = generateVerificationCode();

    await prisma.adminProfile.update({
        where: {userId: updatedUser.id},
        data: {
            recoveryCode: newRecoveryCode,
        },
    });

    await sendEmail(
        updatedUser.email,
        'Новый код восстановления',
        recoveryEmail(newRecoveryCode)
    );

    return {
        message: 'Пароль успешно обновлён. Новый код отправлен на email.',
        userId: updatedUser.id,
    };
};
