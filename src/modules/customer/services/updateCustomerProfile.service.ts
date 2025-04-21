import {prisma} from '../../../core/database/prisma';
import {UpdateCustomerDTO} from '../dtos/updateCustomerProfile.dto';
import {FileType} from '@prisma/client';
import fs from 'fs';
import path from 'path';
import {getUserById} from '../../user/services/getUser';
import {handleFileUpload} from '../../auth/utils/files/handleFileUpload';
import {hashPassword} from '../../auth/utils/hashPassword';

export const updateCustomerProfileService = async (
    userId: number,
    data: UpdateCustomerDTO,
    files: Record<string, Express.Multer.File[]>
) => {
    let {
        email,
        firstName,
        lastName,
        phone,
        updateAddresses,
        deleteAddressIds,
        newAddresses,
        password,
    } = data as any;

    try {
        if (typeof deleteAddressIds === 'string' && deleteAddressIds.trim()) {
            deleteAddressIds = deleteAddressIds
                .split(',')
                .map((id: string) => Number(id.trim()))
                .filter((id: number) => !isNaN(id));
        }

        if (Array.isArray(deleteAddressIds)) {
            deleteAddressIds = deleteAddressIds.map(Number);
        }

        if (typeof updateAddresses === 'string' && updateAddresses.trim()) {
            let str = updateAddresses.trim();
            if (!str.startsWith('[')) {
                str = `[${str}]`;
            }

            try {
                const parsed = JSON.parse(str);
                updateAddresses = Array.isArray(parsed) ? parsed : [parsed];
            } catch (err) {
                console.error(
                    '❌ Ошибка при парсинге updateAddresses:',
                    str,
                    err
                );
                throw new Error('Некорректный формат updateAddresses');
            }
        }

        if (typeof newAddresses === 'string' && newAddresses.trim()) {
            try {
                const parsed = JSON.parse(newAddresses);
                newAddresses = Array.isArray(parsed) ? parsed : [parsed];
            } catch (err) {
                console.error(
                    '❌ Ошибка при парсинге newAddresses:',
                    newAddresses,
                    err
                );
                throw new Error('Некорректный формат newAddresses');
            }
        }
    } catch (err) {
        console.error('❌ Ошибка парсинга входных данных:', err);
        throw new Error('Некорректный формат входных данных');
    }

    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {customerProfile: true},
    });

    if (!user || !user.customerProfile) {
        throw new Error('Пользователь не найден или не является заказчиком');
    }

    const customerId = user.customerProfile.id;

    let passwordHash: string | undefined;
    if (password) {
        passwordHash = await hashPassword(password);
    }

    await prisma.user.update({
        where: {id: userId},
        data: {
            ...(email && {email}),
            ...(firstName && {firstName}),
            ...(lastName && {lastName}),
            ...(phone && {phone}),
            ...(passwordHash ? {password: passwordHash} : {}),
        },
    });

    if (Array.isArray(updateAddresses) && updateAddresses.length > 0) {
        await Promise.all(
            updateAddresses.map((addr: any) =>
                prisma.address.update({
                    where: {id: Number(addr.id)},
                    data: {
                        value: addr.value,
                        isDefault: addr.isDefault,
                    },
                })
            )
        );
    }

    if (Array.isArray(deleteAddressIds) && deleteAddressIds.length > 0) {
        await prisma.address.deleteMany({
            where: {
                id: {in: deleteAddressIds},
                userId: customerId,
            },
        });
    }

    if (Array.isArray(newAddresses) && newAddresses.length > 0) {
        await prisma.address.createMany({
            data: newAddresses.map((addr: any) => ({
                value: addr.value,
                isDefault: addr.isDefault ?? false,
                userId: customerId,
            })),
        });
    }

    if (files.profilePhoto && files.profilePhoto.length > 0) {
        await handleFileUpload({profilePhoto: files.profilePhoto}, userId);

        const allPhotos = await prisma.file.findMany({
            where: {userId, type: FileType.PROFILE_PHOTO},
            orderBy: {uploadedAt: 'desc'},
        });

        const [latestPhoto, ...oldPhotos] = allPhotos;

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
                if (fs.existsSync(diskPath)) {
                    fs.unlinkSync(diskPath);
                }
            }
        }
    }

    return await getUserById(userId);
};
