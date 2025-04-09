// src/modules/auth/verifyCode.service.ts
import {AccountStatus} from '@prisma/client';
import {prisma} from '../../../db/prisma';

export interface VerifyCodeResult {
    success: boolean;
    error?: string;
}

export async function verifyCode(
    email: string,
    code: string
): Promise<VerifyCodeResult> {
    const user = await prisma.user.findUnique({
        where: {email},
        include: {verificationCode: true},
    });

    if (!user || !user.verificationCode) {
        return {success: false, error: 'Пользователь не найден'};
    }

    if (user.verificationCode.code !== code) {
        return {success: false, error: 'Неверный код подтверждения'};
    }

    if (user.verificationCode.expiresAt < new Date()) {
        return {success: false, error: 'Срок действия кода истек'};
    }

    await prisma.user.update({
        where: {email},
        data: {
            status: AccountStatus['VERIFIED'],
        },
    });

    return {success: true};
}
