import {ExecutorProfileDto} from '../dto/executorProfile.dto';
import {FileType} from '@prisma/client';

export const toExecutorProfile = (
    executor: any,
    files: any[],
    phone: string | null = null
): ExecutorProfileDto => {
    const pick = (type: FileType) => files.find((f) => f.type === type) ?? null;
    const fmt = (f: any) => (f ? {id: f.id, url: f.url, type: f.type} : null);

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
        profilePhoto: fmt(pick(FileType.PROFILE_PHOTO)),
        licenseDoc: fmt(pick(FileType.LICENSE)),
        registrationDoc: fmt(pick(FileType.REGISTRATION_CERTIFICATE)),
    };
};
