import {prisma} from '../../../../core/database/prisma';
import {FileType} from '@prisma/client';
import {getFileTypeByKey} from './getFileTypeByKey';

export async function handleFileUpload(
    files: Record<string, Express.Multer.File[]>,
    userId: number
) {
    const filePromises: Promise<any>[] = [];

    for (const key in files) {
        const fileType = getFileTypeByKey(key);

        if (!fileType) {
            console.warn(`⛔ Пропущен нераспознанный тип файла: ${key}`);
            continue;
        }

        for (const file of files[key]) {
            console.log(
                `📎 Добавляем файл "${file.originalname}" как ${fileType}`
            );

            filePromises.push(
                prisma.file
                    .create({
                        data: {
                            url: `/files/${file.filename}`,
                            filename: file.filename,
                            mimetype: file.mimetype,
                            type: fileType,
                            userId,
                            size: file.size,
                        },
                    })
                    .catch((err) => {
                        console.error(
                            `❌ Ошибка при сохранении файла ${file.originalname}:`,
                            err
                        );
                    })
            );
        }
    }

    return Promise.all(filePromises);
}
