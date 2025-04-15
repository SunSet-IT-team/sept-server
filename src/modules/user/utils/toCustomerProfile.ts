import {CustomerProfileDto} from '../dto/customerProfile.dto';
import {FileType} from '@prisma/client';

export const toCustomerProfile = (
    customer: any,
    files: any[],
    phone: string | null = null
): CustomerProfileDto => {
    const photo = files.find((f) => f.type === FileType.PROFILE_PHOTO);

    return {
        id: customer.id,
        phone: phone ?? null,
        profilePhoto: photo
            ? {
                  id: photo.id,
                  url: photo.url,
                  filename: photo.filename,
                  type: photo.type,
              }
            : null,
        ordersCount: customer.orders?.length || 0,
        reviewCount: customer.reviewCount ?? 0,
        priority: customer.priority,
        addresses:
            customer.addresses?.map((a: any) => ({
                id: a.id,
                value: a.value,
            })) || [],
    };
};
