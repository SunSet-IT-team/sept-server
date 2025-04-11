// services/adminRecoveryService.ts
import {prisma} from '../../../core/database/prisma';
import {sendVerificationEmail} from '../utils/email';
import {generateVerificationCode} from '../utils/generateVerificationCode';
import bcrypt from 'bcrypt';
import {hashPassword} from '../utils/hashPassword';

export const adminRecoveryService = async (
    email: string,
    code: string,
    newPassword: string
) => {
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

    await sendVerificationEmail(updatedUser.email, newRecoveryCode);

    return {message: 'Пароль успешно обновлен и новый код отправлен на email'};
};
