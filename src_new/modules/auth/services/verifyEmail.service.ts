import {Request, Response} from 'express';
import {prisma} from '../../../core/database/prisma';
import {AccountStatus} from '@prisma/client';

export const verifyEmail = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {code} = req.params;

    try {
        const emailVerification = await prisma.emailVerification.findFirst({
            where: {code},
            include: {user: true},
        });

        if (!emailVerification) {
            res.status(400).json({
                success: false,
                message: 'Неверный код верификации',
            });
            return;
        }

        if (new Date() > emailVerification.expiresAt) {
            res.status(400).json({
                success: false,
                message: 'Срок действия кода истек',
            });
            return;
        }

        if (emailVerification.used) {
            res.status(400).json({
                success: false,
                message: 'Код уже был использован',
            });
            return;
        }

        await prisma.user.update({
            where: {id: emailVerification.userId},
            data: {status: AccountStatus['VERIFIED']},
        });

        await prisma.emailVerification.update({
            where: {id: emailVerification.id},
            data: {used: true},
        });

        res.status(200).json({
            success: true,
            message: 'Email успешно подтвержден',
        });
        return;
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Ошибка верификации',
            error: err,
        });
        return;
    }
};
