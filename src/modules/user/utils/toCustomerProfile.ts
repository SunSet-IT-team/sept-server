import {CustomerProfileDto} from '../dto/customerProfile.dto';
import {FileType} from '@prisma/client';

export const toCustomerProfile = (customer: any): CustomerProfileDto => {
    const photo = customer.user.files.find(
        (f: any) => f.type === FileType.PROFILE_PHOTO
    );

    return {
        id: customer.id,
        phone: customer.user.phone,
        profilePhoto: photo
            ? {
                  id: photo.id,
                  url: photo.url,
                  filename: photo.filename,
                  type: photo.type,
              }
            : null,
        ordersCount: customer.orders.length,
        priority: customer.priority,
        addresses: customer.addresses.map((a: any) => ({
            id: a.id,
            value: a.value,
        })),
    };
};
