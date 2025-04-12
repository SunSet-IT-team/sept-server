import {prisma} from '../../../core/database/prisma';
import {verificationEmail} from '../../../core/utils/email/templates/verificationEmail';
import {sendEmail} from '../../../core/utils/email/sendEmail';
import {RegisterCustomerDTO} from '../dtos/registerCustomer.dto';
import {hashPassword} from '../utils/hashPassword';
import {Role, AccountStatus} from '@prisma/client';
import {v4 as uuidv4} from 'uuid';
import {generateVerificationCode} from '../utils/generateVerificationCode';

export const registerCustomerService = async (dto: RegisterCustomerDTO) => {
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

            return {
                id: existingUser.id,
                email: existingUser.email,
                role: existingUser.role,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                phone: existingUser.phone,
                status: existingUser.status,
                verificationCode: newCode,
                addresses: existingUser.customerProfile?.addresses ?? [],
                message: 'Код подтверждения отправлен повторно',
            };
        }

        throw new Error('Пользователь с таким email уже зарегистрирован');
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
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
                    code: generateVerificationCode(),
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                },
            },
        },
        include: {
            customerProfile: {
                include: {
                    addresses: {
                        select: {id: true, value: true},
                    },
                },
            },
            emailVerification: true,
        },
    });

    if (!user.emailVerification || !user.customerProfile) {
        throw new Error('Не удалось создать верификацию');
    }

    await sendEmail(
        user.email,
        'Подтверждение почты',
        verificationEmail(user.emailVerification.code)
    );

    return {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        status: user.status,
        verificationCode: user.emailVerification.code,
        addresses: user.customerProfile.addresses,
    };
};
