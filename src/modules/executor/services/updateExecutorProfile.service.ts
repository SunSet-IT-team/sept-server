import {prisma} from '../../../core/database/prisma';
import {UpdateExecutorDTO} from '../dtos/updateExecutorProfile.dto';
import {handleFileUpload} from '../../auth/utils/files/handleFileUpload';
import fs from 'fs';
import path from 'path';
import {toUserDto} from '../../user/utils/toUser';

export const updateExecutorProfileService = async (
    userId: number,
    dto: UpdateExecutorDTO,
    files: Record<string, Express.Multer.File[]>
) => {
    const executor = await prisma.executorProfile.findUnique({
        where: {userId},
    });

    if (!executor) {
        throw new Error('Профиль исполнителя не найден');
    }

    const {firstName, lastName, phone, fileIdsToDelete, ...executorData} = dto;

    const filteredUserData: any = {};
    if (firstName) filteredUserData.firstName = firstName;
    if (lastName) filteredUserData.lastName = lastName;
    if (phone) filteredUserData.phone = phone;

    const filteredExecutorData: Record<string, any> = {};
    for (const key in executorData) {
        const value = executorData[key as keyof typeof executorData];
        if (value !== undefined && value !== null && value !== '') {
            filteredExecutorData[key] = value;
        }
    }

    await prisma.user.update({
        where: {id: userId},
        data: filteredUserData,
    });

    await prisma.executorProfile.update({
        where: {userId},
        data: filteredExecutorData,
    });

    if (fileIdsToDelete?.length) {
        const numericIdsToDelete = fileIdsToDelete.map((id) => Number(id));

        const filesToDelete = await prisma.file.findMany({
            where: {
                id: {in: numericIdsToDelete},
                userId,
            },
        });

        await prisma.file.deleteMany({
            where: {
                id: {in: numericIdsToDelete},
                userId,
            },
        });

        for (const file of filesToDelete) {
            const filePath = path.resolve(
                __dirname,
                '../../../../uploads',
                file.filename
            );
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    }

    if (files) {
        await handleFileUpload(files, userId);
    }

    const fullUser = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            executorProfile: {
                select: {
                    orders: true,
                },
                include: {
                    orders: true,
                    user: {
                        include: {
                            files: {
                                select: {
                                    id: true,
                                    url: true,
                                    filename: true,
                                    type: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!fullUser?.executorProfile) {
        throw new Error('Ошибка при получении обновлённого профиля');
    }

    return toUserDto(fullUser);
};
