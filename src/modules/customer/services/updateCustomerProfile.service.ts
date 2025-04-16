import {prisma} from '../../../core/database/prisma';
import {UpdateCustomerDTO} from '../dtos/updateCustomerProfile.dto';
import {FileType} from '@prisma/client';
import fs from 'fs';
import path from 'path';
import {getUserById} from '../../user/services/getUser';
import {toUserDto} from '../../user/utils/toUser';

export const updateCustomerProfileService = async (
    userId: number,
    data: UpdateCustomerDTO
) => {
    const {
        firstName,
        lastName,
        phone,
        updateAddresses,
        deleteAddressIds,
        newAddresses,
        profilePhoto,
    } = data;

    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {customerProfile: true},
    });

    if (!user || !user.customerProfile) {
        throw new Error('Пользователь не найден или не является заказчиком');
    }

    const customerId = user.customerProfile.id;

    // Обновление пользователя
    await prisma.user.update({
        where: {id: userId},
        data: {firstName, lastName, phone},
    });

    // Обновление адресов
    if (updateAddresses?.length) {
        for (const addr of updateAddresses) {
            await prisma.address.update({
                where: {id: addr.id},
                data: {
                    value: addr.value,
                    isDefault: addr.isDefault,
                },
            });
        }
    }

    // Удаление адресов
    if (deleteAddressIds?.length) {
        await prisma.address.deleteMany({
            where: {
                id: {in: deleteAddressIds},
                userId: customerId,
            },
        });
    }

    // Добавление новых адресов
    if (newAddresses?.length) {
        await prisma.address.createMany({
            data: newAddresses.map((a) => ({
                value: a.value,
                isDefault: a.isDefault ?? false,
                userId: customerId,
            })),
        });
    }

    // Обновление фото — логика как раньше
    if (profilePhoto) {
        const oldPhoto = await prisma.file.findFirst({
            where: {userId, type: FileType.PROFILE_PHOTO},
        });

        if (oldPhoto) {
            await prisma.file.delete({where: {id: oldPhoto.id}});
            const fsPath = path.join(
                __dirname,
                '../../../../uploads',
                oldPhoto.filename
            );
            fs.unlink(fsPath, (err) => {
                if (err) console.warn('Ошибка удаления фото:', err);
            });
        }

        await prisma.file.create({
            data: {
                userId,
                type: FileType.PROFILE_PHOTO,
                filename: profilePhoto.filename,
                mimetype: profilePhoto.mimetype,
                size: profilePhoto.size,
                url: `/files/${profilePhoto.filename}`,
            },
        });
    }

    const customer = getUserById(userId);

    return toUserDto(customer);
};
