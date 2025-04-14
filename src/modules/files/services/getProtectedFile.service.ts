import {Response} from 'express';
import fs from 'fs';
import {prisma} from '../../../core/database/prisma';
import {getLocalFilePath} from '../utils/getLocalFilePath';

interface Options {
    filename: string;
    res: Response;
}

export const sendProtectedFile = async ({filename, res}: Options) => {
    const file = await prisma.file.findFirst({
        where: {url: filename},
    });

    if (!file) {
        throw new Error('Файл не найден в базе');
    }

    const filePath = getLocalFilePath(filename);

    if (!fs.existsSync(filePath)) {
        throw new Error('Файл отсутствует на сервере');
    }

    res.sendFile(filePath);
};
