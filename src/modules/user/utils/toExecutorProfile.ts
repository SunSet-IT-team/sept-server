import {ExecutorProfileDto} from '../dto/executorProfile.dto';
import {FileType} from '@prisma/client';

export const toExecutorProfile = (executor: any): ExecutorProfileDto => {
    const photo = executor.user.files.find(
        (f: any) => f.type === FileType.PROFILE_PHOTO
    );

    return {
        id: executor.id,
        workFormat: executor.workFormat,
        experience: executor.experience,
        about: executor.about,
        companyName: executor.companyName,
        description: executor.description,
        city: executor.city,
        completedOrders: executor.completedOrders,
        rating: executor.rating,
        phone: executor.user.phone,
        priority: executor.priority,
        profilePhoto: photo
            ? {
                  id: photo.id,
                  url: photo.url,
                  type: photo.type,
              }
            : null,
    };
};
