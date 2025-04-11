import {prisma} from '../../../core/database/prisma';
import {handleFileUpload} from '../utils/files/handleFileUpload';
import {Role} from '@prisma/client';
import {RegisterExecutorDTO} from '../dtos/registerExecutor.dto';
import {hashPassword} from '../utils/hashPassword';

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

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: Role['EXECUTOR'],
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
        },
        include: {
            executorProfile: true,
        },
    });

    const executorId = user.executorProfile?.id;

    if (!executorId) throw new Error('Профиль не создан');

    await handleFileUpload(files, executorId);

    return user;
};
