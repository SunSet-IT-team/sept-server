import {prisma} from '../../../core/database/prisma';
import {Role, AccountStatus} from '@prisma/client';
import {RegisterExecutorDTO} from '../dtos/registerExecutor.dto';
import {hashPassword} from '../utils/hashPassword';
import {generateVerificationCode} from '../utils/generateVerificationCode';
import {getUserById} from '../../user/services/getUser';
import {sendEmail} from '../../../core/utils/email/sendEmail';
import {verificationEmail} from '../../../core/utils/email/templates/verificationEmail';
import {handleFileUpload} from '../utils/files/handleFileUpload';

export const registerExecutorService = async (
    dto: RegisterExecutorDTO,
    files: Record<string, Express.Multer.File[]> | undefined
) => {
    const {
        email,
        password,
        firstName,
        lastName,
        phone,
        workFormat,
        experience,
        city,
        about,
        companyName,
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
            const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

            await prisma.emailVerification.upsert({
                where: {userId: existingUser.id},
                update: {
                    code: newCode,
                    used: false,
                    expiresAt,
                },
                create: {
                    userId: existingUser.id,
                    code: newCode,
                    expiresAt,
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
    const verificationCode = generateVerificationCode();
    const verificationExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const createdUser = await prisma.user.create({
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
                    experience: parseInt(experience),
                    about,
                    companyName,
                    city,
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

    if (files) {
        await handleFileUpload(files, createdUser.id);
    }

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
