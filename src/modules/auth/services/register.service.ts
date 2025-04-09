import {prisma} from '../../../db/prisma';
import bcrypt from 'bcrypt';
import {generateVerificationCode} from '../../../helpers/codeGenerator';
import {sendVerificationEmail} from './email.service';
import {AccountStatus} from '@prisma/client';

const SALT_ROUNDS = 10;
const CODE_EXPIRATION_MINUTES = 15;

interface RegisterResult {
    success: boolean;
    message?: string;
    error?: string;
    isResent?: boolean;
}

type RegisterUserParams =
    | {
          role: 'CUSTOMER';
          email: string;
          password: string;
          address: string;
      }
    | {
          role: 'EXECUTOR';
          email: string;
          password: string;
          city: string;
      };

export async function registerUser(
    data: RegisterUserParams
): Promise<RegisterResult> {
    try {
        const {email, password, role} = data;

        // Проверка существующего пользователя
        const existingUser = await prisma.user.findUnique({
            where: {email},
            include: {verificationCode: true},
        });

        // Если пользователь существует и уже подтвержден
        if (
            existingUser &&
            (existingUser.status === AccountStatus['VERIFIED'] ||
                existingUser.status === AccountStatus['DELETED'])
        ) {
            return {
                success: false,
                error: 'Пользователь с таким email уже существует',
            };
        }

        // Если пользователь существует, но не подтвержден
        if (
            existingUser &&
            existingUser.status === AccountStatus['UNVERIFIED']
        ) {
            // Генерация нового кода
            const newVerificationCode = generateVerificationCode();
            const newExpiresAt = new Date();
            newExpiresAt.setMinutes(
                newExpiresAt.getMinutes() + CODE_EXPIRATION_MINUTES
            );

            // Обновление кода подтверждения
            await prisma.verificationCode.update({
                where: {userId: existingUser.id},
                data: {
                    code: newVerificationCode,
                    expiresAt: newExpiresAt,
                },
            });

            // Отправка нового кода
            await sendVerificationEmail(email, newVerificationCode);

            return {
                success: true,
                message: 'Новый код подтверждения отправлен на вашу почту',
                isResent: true,
            };
        }

        // Создание нового пользователя (если не существует)
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const verificationCode = generateVerificationCode();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + CODE_EXPIRATION_MINUTES);

        const createData: any = {
            email,
            password: hashedPassword,
            role,
            status: AccountStatus['UNVERIFIED'],
            verificationCode: {
                create: {
                    code: verificationCode,
                    expiresAt,
                },
            },
        };

        if (role === 'CUSTOMER') {
            createData.customerProfile = {
                create: {
                    address: (data as any).address,
                },
            };
        } else if (role === 'EXECUTOR') {
            createData.executorProfile = {
                create: {
                    city: (data as any).city,
                },
            };
        }

        await prisma.user.create({
            data: createData,
        });

        await sendVerificationEmail(email, verificationCode);

        return {
            success: true,
            message: 'Код подтверждения отправлен на вашу почту',
        };
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        return {
            success: false,
            error: 'Произошла ошибка при регистрации',
        };
    }
}
