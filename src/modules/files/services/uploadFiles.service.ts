import {prisma} from '../../../core/database/prisma';
import {FileType} from '@prisma/client';

export const uploadFilesService = async (
    files: Express.Multer.File[],
    userId: string
) => {
    // Загрузим файлы поштучно, чтобы получить их ID
    const results = await Promise.all(
        files.map(async (file) => {
            return prisma.file.create({
                data: {
                    userId,
                    filename: file.originalname,
                    url: `${file.filename}`,
                    mimetype: file.mimetype,
                    size: file.size,
                    type: FileType.OTHER,
                },
            });
        })
    );

    return results;
};
