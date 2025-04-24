// modules/auth/utils/files/getFileTypeByKey.ts
import {FileType} from '@prisma/client';

export function getFileTypeByKey(key: string): FileType | null {
    const map: Record<string, FileType> = {
        profilePhoto: FileType.PROFILE_PHOTO,
        registrationDoc: FileType.REGISTRATION_CERTIFICATE,
        licenseDoc: FileType.LICENSE,
        otherFiles: FileType.OTHER,
        reportFiles: FileType.REPORT_FILE,
        orderPreview: FileType.ORDER_PREVIEW,
        servicePreview: FileType.SERVICE_PREVIEW,
    };

    return map[key] || null;
}
