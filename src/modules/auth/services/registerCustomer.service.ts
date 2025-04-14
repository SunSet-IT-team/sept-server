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

    const existingUser = await prisma.user.findUnique({
        where: {email},
        include: {
            emailVerification: true,
            customerProfile: {
                include: {
                    addresses: {
                        select: {id: true, value: true},
                    },
                },
            },
        },
    });

    if (existingUser) {
        if (existingUser.status === AccountStatus.UNVERIFIED) {
            const newCode = generateVerificationCode();

            await prisma.emailVerification.upsert({
                where: {userId: existingUser.id},
                update: {
                    code: newCode,
                    used: false,
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                },
                create: {
                    userId: existingUser.id,
                    code: newCode,
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                },
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

    const hashedPassword = await hashPassword(password);
    const code = generateVerificationCode();

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
                        },
                    },
                },
            },
            emailVerification: {
                create: {
                    code,
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                },
            },
        },
    });

    // загружаем файлы, если есть
    if (files && Object.keys(files).length > 0) {
        await handleFileUpload(files, createdUser.id);
    }

    await sendEmail(
        createdUser.email,
        'Подтверждение почты',
        verificationEmail(code)
    );

    const userDto = await getUserById(createdUser.id);

    return {
        message:
            'Регистрация прошла успешно. Код подтверждения отправлен на email.',
        user: userDto,
    };
};
