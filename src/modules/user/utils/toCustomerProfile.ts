import {CustomerProfileDto} from '../dto/customerProfile.dto';
import {FileType} from '@prisma/client';

export const toCustomerProfile = (
    customer: any,
    files: any[],
    phone: string | null = null,
    favoriteIds: {id: number}[] = []
): CustomerProfileDto => {
    const photos = files
        .filter((f) => f.type === FileType.PROFILE_PHOTO)
        .map((f) => ({
            id: f.id,
            url: f.url,
            filename: f.filename,
            type: f.type as FileType,
        }));

    return {
        phone,
        profilePhotos: photos,
        priority: customer.priority,
        favoriteIds,
        addresses:
            customer.addresses?.map((a: any) => ({
                id: a.id,
                value: a.value,
            })) ?? [],
    };
};
