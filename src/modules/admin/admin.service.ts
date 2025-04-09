// src/modules/admin/admin.service.ts
import {Request} from 'express';
import {prisma} from '../../db/prisma';
import {recoveryCodeGenerator} from '../../helpers/recoveryCodeGenerator';
import {sendRecoveryCode} from '../auth/services/email.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const SALT_ROUNDS = 10;

interface RecoveryParams {
    authorization: Request['headers']['authorization'];
    code: string;
    newPassword: string;
    confirmPassword: string;
}

export async function recovery({
    authorization,
    code,
    newPassword,
    confirmPassword,
}: RecoveryParams) {
    const authHeader = authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        throw new Error('Токен не предоставлен');
    }

    const token = authHeader.split(' ')[1];
    let userId: number;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {userId: number};
        userId = decoded.userId;
    } catch (error) {
        throw new Error('Недействительный токен');
    }

    if (newPassword !== confirmPassword) {
        throw new Error('Пароли не совпадают');
    }

    const user = await prisma.user.findUnique({
        where: {id: userId},
        select: {
            id: true,
            email: true,
            code: true,
            password: true,
        },
    });

    if (!user) {
        throw new Error('Пользователь не найден');
    }

    if (!user.code || user.code.toLowerCase() !== code.toLowerCase()) {
        throw new Error('Неверный проверочный код');
    }

    const newCode = recoveryCodeGenerator(8);
    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await prisma.user.update({
        where: {id: userId},
        data: {
            password: passwordHash,
            code: newCode,
        },
    });

    await sendRecoveryCode(user.email, newCode);

    return {
        success: true,
        message: 'Пароль успешно изменен. Новый код отправлен на вашу почту.',
    };
}
