import {prisma} from '../../../core/database/prisma';
import {UpdateCustomerDTO} from '../dtos/updateCustomerProfile.dto';
import {FileType} from '@prisma/client';
import fs from 'fs';
import path from 'path';
import {getUserById} from '../../user/services/getUser';
import {handleFileUpload} from '../../auth/utils/files/handleFileUpload';

export const updateCustomerProfileService = async (
    userId: number,
    data: UpdateCustomerDTO
) => {
    const {
        email,
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

    await prisma.user.update({
        where: {id: userId},
        data: {
            ...(email ? {email} : {}),
            ...(firstName ? {firstName} : {}),
            ...(lastName ? {lastName} : {}),
            ...(phone ? {phone} : {}),
        },
    });

    if (updateAddresses?.length) {
        for (const addr of updateAddresses) {
            await prisma.address.update({
                where: {id: addr.id},
                data: {value: addr.value, isDefault: addr.isDefault},
            });
        }
    }
    if (deleteAddressIds?.length) {
        await prisma.address.deleteMany({
            where: {id: {in: deleteAddressIds}, userId: customerId},
        });
    }
    if (newAddresses?.length) {
        await prisma.address.createMany({
            data: newAddresses.map((a) => ({
                value: a.value,
                isDefault: a.isDefault ?? false,
                userId: customerId,
            })),
        });
    }

    if (profilePhoto) {
        const oldPhotos = await prisma.file.findMany({
            where: {userId, type: FileType.PROFILE_PHOTO},
        });
        if (oldPhotos.length) {
            await prisma.file.deleteMany({
                where: {id: {in: oldPhotos.map((f) => f.id)}},
            });
            for (const f of oldPhotos) {
                const diskPath = path.resolve(
                    __dirname,
                    '../../../../uploads',
                    f.filename
                );
                if (fs.existsSync(diskPath)) fs.unlinkSync(diskPath);
            }
        }

        const filesObject = {profilePhoto: [profilePhoto]};
        await handleFileUpload(filesObject, userId);
    }

    const updated = await getUserById(userId);
    return updated;
};
