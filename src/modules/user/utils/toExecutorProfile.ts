import {ExecutorProfileDto} from '../dto/executorProfile.dto';
import {FileType} from '@prisma/client';

export const toExecutorProfile = (
    executor: any,
    files: any[],
    phone: string | null = null
): ExecutorProfileDto => {
    const getFile = (type: FileType) =>
        files.find((f) => f.type === type) || null;

    const formatFile = (file: any) =>
        file
            ? {
                  id: file.id,
                  url: file.url,
                  type: file.type,
              }
            : null;

    return {
        workFormat: executor.workFormat,
        experience: executor.experience,
        about: executor.about,
        companyName: executor.companyName,
        description: executor.description,
        city: executor.city,
        completedOrders: executor.completedOrders,
        rating: executor.rating,
        phone: phone ?? null,
        priority: executor.priority,
        profilePhoto: formatFile(getFile(FileType.PROFILE_PHOTO)),
        licenseDoc: formatFile(getFile(FileType.LICENSE)),
        registrationDoc: formatFile(getFile(FileType.REGISTRATION_CERTIFICATE)),
    };
};
