// src/modules/user/utils/toExecutorProfile.ts

import {
    ExecutorProfileDto,
    ExecutorProfileFileDto,
} from '../dto/executorProfile.dto';
import {FileType} from '@prisma/client';

export const toExecutorProfile = (
    executor: any,
    files: any[],
    phone: string | null = null
): ExecutorProfileDto => {
    // Подбираем все файлы заданного типа и форматируем
    const pickAll = (type: FileType): ExecutorProfileFileDto[] =>
        files
            .filter((f) => f.type === type)
            .map((f) => ({
                id: f.id,
                url: f.url,
                type: f.type as FileType,
            }));

    return {
        workFormat: executor.workFormat,
        experience: executor.experience,
        about: executor.about,
        companyName: executor.companyName,
        description: executor.description,
        city: executor.city,
        completedOrders: executor.completedOrders,
        rating: executor.rating,
        phone,
        priority: executor.priority,

        profilePhotos: pickAll(FileType.PROFILE_PHOTO),
        licenseDocs: pickAll(FileType.LICENSE),
        registrationDocs: pickAll(FileType.REGISTRATION_CERTIFICATE),
    };
};
