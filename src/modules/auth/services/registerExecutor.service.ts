import {prisma} from '../../../core/database/prisma';
import {handleFileUpload} from '../utils/files/handleFileUpload';
import {Role, AccountStatus} from '@prisma/client';
import {RegisterExecutorDTO} from '../dtos/registerExecutor.dto';
import {hashPassword} from '../utils/hashPassword';
import {sendEmail} from '../../../core/utils/email/sendEmail';
import {verificationEmail} from '../../../core/utils/email/templates/verificationEmail';
import {generateVerificationCode} from '../utils/generateVerificationCode';
import {getUserById} from '../../user/services/getUser';

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

            const userDto = await getUserById(existingUser.id);

            return {
                message: 'Код подтверждения отправлен повторно',
                userDto,
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
    });

    if (files) {
        await handleFileUpload(files, createdUser.id);
    }

    await sendEmail(email, 'Подтверждение почты', verificationEmail(code));

    const userDto = await getUserById(createdUser.id);

    return {
        message:
            'Регистрация прошла успешно. Код подтверждения отправлен на email.',
        user: userDto,
    };
};
