import {prisma} from '../../../../core/database/prisma';
import {FileType} from '@prisma/client';
import {Express} from 'express';
import {getFileTypeByKey} from './getFileTypeByKey';

export async function handleFileUpload(
    files: Record<string, Express.Multer.File[]>,
    userId: string
) {
    const filePromises: Promise<any>[] = [];

    for (const key in files) {
        files[key].forEach((file) => {
            const fileType: FileType = getFileTypeByKey(key);

            filePromises.push(
                prisma.file.create({
                    data: {
                        url: file.path,
                        filename: file.originalname,
                        mimetype: file.mimetype,
                        type: fileType,
                        userId,
                        size: file.size,
                    },
                })
            );
        });
    }

    return Promise.all(filePromises);
}
