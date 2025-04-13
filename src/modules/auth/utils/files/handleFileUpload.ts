// modules/auth/utils/files/handleFileUpload.ts
import {prisma} from '../../../../core/database/prisma';
import {FileType} from '@prisma/client';
import {getFileTypeByKey} from './getFileTypeByKey';

export async function handleFileUpload(
    files: Record<string, Express.Multer.File[]>,
    userId: string
) {
    const filePromises: Promise<any>[] = [];

    for (const key in files) {
        for (const file of files[key]) {
            const fileType = getFileTypeByKey(key);
            if (!fileType) continue;

            filePromises.push(
                prisma.file.create({
                    data: {
                        url: `/files/${file.filename}`,
                        filename: file.filename,
                        mimetype: file.mimetype,
                        type: fileType,
                        userId,
                        size: file.size,
                    },
                })
            );
        }
    }

    return Promise.all(filePromises);
}
