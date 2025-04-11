import {FileType} from '@prisma/client';

export function getFileTypeByKey(key: string): FileType {
    switch (key) {
        case 'profilePhoto':
            return 'PROFILE_PHOTO';
        case 'registrationDoc':
        case 'licenseDoc':
            return 'DOCUMENT';
        default:
            return 'OTHER';
    }
}
