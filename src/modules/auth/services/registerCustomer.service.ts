import {prisma} from '../../../core/database/prisma';
import {verificationEmail} from '../../../core/utils/email/templates/verificationEmail';
import {sendEmail} from '../../../core/utils/email/sendEmail';
import {RegisterCustomerDTO} from '../dtos/registerCustomer.dto';
import {hashPassword} from '../utils/hashPassword';
import {Role, AccountStatus} from '@prisma/client';
import {generateVerificationCode} from '../utils/generateVerificationCode';
import {getUserById} from '../../user/services/getUser';
import {handleFileUpload} from '../utils/files/handleFileUpload';

export const registerCustomerService = async (
    dto: RegisterCustomerDTO,
    files: Record<string, Express.Multer.File[]>
) => {
    const {email, password, firstName, lastName, phone, address} = dto;

    // Проверка на существующего пользователя
    const existingUser = await prisma.user.findUnique({
        where: {email},
        include: {
            emailVerification: true,
            customerProfile: {
                include: {
                    addresses: true,
                },
            },
        },
    });

    if (existingUser) {
        // Повторная отправка кода для UNVERIFIED
        if (existingUser.status === AccountStatus.UNVERIFIED) {
            const newCode = generateVerificationCode();
            const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

            await prisma.emailVerification.upsert({
                where: {userId: existingUser.id},
                update: {code: newCode, used: false, expiresAt},
                create: {userId: existingUser.id, code: newCode, expiresAt},
            });

            await sendEmail(
                existingUser.email,
                'Подтверждение почты',
                verificationEmail(newCode)
            );

            const userDto = await getUserById(existingUser.id);
            return {
                message: 'Код подтверждения отправлен повторно',
                user: userDto,
            };
        }

        throw new Error('Пользователь с таким email уже зарегистрирован');
    }

    // Создание нового пользователя
    const hashedPassword = await hashPassword(password);
    const verificationCode = generateVerificationCode();
    const verificationExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const createdUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: Role.CUSTOMER,
            status: AccountStatus.UNVERIFIED,
            firstName,
            lastName,
            phone,
            customerProfile: {
                create: {
                    addresses: {
                        create: {
                            value: address,
                            isDefault: true,
                        },
                    },
                },
            },
            emailVerification: {
                create: {
                    code: verificationCode,
                    expiresAt: verificationExpiresAt,
                },
            },
        },
    });

    // Обработка файлов
    const hasFiles = files && Object.keys(files).length > 0;
    if (hasFiles) {
        await handleFileUpload(files, createdUser.id);
    }

    // Отправка кода
    await sendEmail(
        createdUser.email,
        'Подтверждение почты',
        verificationEmail(verificationCode)
    );

    const userDto = await getUserById(createdUser.id);

    return {
        user: userDto,
    };
};
