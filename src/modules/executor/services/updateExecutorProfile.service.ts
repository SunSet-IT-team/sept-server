import {prisma} from '../../../core/database/prisma';
import {UpdateExecutorDTO} from '../dtos/updateExecutorProfile.dto';
import {handleFileUpload} from '../../auth/utils/files/handleFileUpload';
import fs from 'fs';
import path from 'path';
import {toUserDto} from '../../user/utils/toUser';
import {getUserById} from '../../user/services/getUser';
import {FileType} from '@prisma/client';

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

    const {phone, experience, fileIdsToDelete, email, ...executorData} = dto;
    const userUpdates: any = {};
    if (phone) userUpdates.phone = phone;
    if (email) userUpdates.email = email;

    const execUpdates: Record<string, any> = {};
    if (experience !== undefined) execUpdates.experience = Number(experience);
    for (const key of Object.keys(
        executorData
    ) as (keyof typeof executorData)[]) {
        const val = executorData[key];
        if (val !== undefined && val !== null && val !== '') {
            execUpdates[key] = val;
        }
    }

    await prisma.user.update({where: {id: userId}, data: userUpdates});
    await prisma.executorProfile.update({where: {userId}, data: execUpdates});

    // 2. Удаление файлов по явным ID
    if (fileIdsToDelete?.length) {
        const ids = fileIdsToDelete.map((i) => Number(i));
        const owned = await prisma.file.findMany({
            where: {id: {in: ids}, userId},
        });
        if (owned.length !== ids.length) {
            throw new Error(
                'Некоторые файлы не найдены или не принадлежат вам'
            );
        }
        await prisma.file.deleteMany({where: {id: {in: ids}, userId}});
        for (const f of owned) {
            const p = path.resolve(
                __dirname,
                '../../../../uploads',
                f.filename
            );
            if (fs.existsSync(p)) fs.unlinkSync(p);
        }
    }

    // 3. Если загружено новое фото профиля — удаляем старые PROFILE_PHOTO
    if (files.profilePhoto && files.profilePhoto.length > 0) {
        const oldPhotos = await prisma.file.findMany({
            where: {userId, type: FileType.PROFILE_PHOTO},
        });
        if (oldPhotos.length) {
            await prisma.file.deleteMany({
                where: {id: {in: oldPhotos.map((f) => f.id)}},
            });
            for (const old of oldPhotos) {
                const p = path.resolve(
                    __dirname,
                    '../../../../uploads',
                    old.filename
                );
                if (fs.existsSync(p)) fs.unlinkSync(p);
            }
        }
    }

    // 4. Загрузка всех новых файлов (включая profilePhoto, registrationDoc, licenseDoc)
    if (files && Object.keys(files).length > 0) {
        await handleFileUpload(files, userId);
    }

    // 5. Возвращаем обновлённый DTO
    return getUserById(userId);
};
