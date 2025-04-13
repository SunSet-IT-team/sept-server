import {prisma} from '../../../core/database/prisma';
import {handleFileUpload} from '../utils/files/handleFileUpload';
import {Role, AccountStatus} from '@prisma/client';
import {RegisterExecutorDTO} from '../dtos/registerExecutor.dto';
import {hashPassword} from '../utils/hashPassword';
import {v4 as uuidv4} from 'uuid';
import {sendEmail} from '../../../core/utils/email/sendEmail';
import {verificationEmail} from '../../../core/utils/email/templates/verificationEmail';
import {generateVerificationCode} from '../utils/generateVerificationCode';

export const registerExecutorService = async (dto: RegisterExecutorDTO) => {
    const {
        email,
        password,
        firstName,
        lastName,
        phone,
        workFormat,
        experience,
        about,
        companyName,
        files,
    } = dto;

    const existingUser = await prisma.user.findUnique({
        where: {email},
        include: {
            emailVerification: true,
            executorProfile: true,
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

            throw new Error(
                'Аккаунт уже существует, но не подтверждён. Проверьте почту для повторной верификации.'
            );
        }

        throw new Error('Пользователь с таким email уже зарегистрирован');
    }

    const hashedPassword = await hashPassword(password);
    const code = generateVerificationCode();

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: Role.EXECUTOR,
            status: AccountStatus.UNVERIFIED,
            firstName,
            lastName,
            phone,
            executorProfile: {
                create: {
                    workFormat,
                    experience: experience ? parseInt(experience) : undefined,
                    about,
                    companyName,
                },
            },
            emailVerification: {
                create: {
                    code,
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                },
            },
        },
        include: {
            executorProfile: true,
            emailVerification: true,
        },
    });

    const executorId = user.executorProfile?.id;
    if (!executorId) {
        throw new Error('Профиль исполнителя не создан');
    }

    if (files) {
        await handleFileUpload(files, user.id);
    }

    await sendEmail(user.email, 'Подтверждение почты', verificationEmail(code));

    return {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        status: user.status,
        verificationCode: code,
    };
};
