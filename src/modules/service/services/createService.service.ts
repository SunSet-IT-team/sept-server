import {prisma} from '../../../core/database/prisma';
import {CreateServiceDTO} from '../dtos/createService.dto';
import {FileType} from '@prisma/client';
import {handleFileUpload} from '../../order/utils/files/handleFileUpload';

function parseOrThrow<T extends 'float' | 'int'>(
    value: string,
    name: string,
    type: T
): number {
    const parsed = type === 'float' ? parseFloat(value) : parseInt(value, 10);
    if (isNaN(parsed)) {
        throw new Error(`Поле "${name}" должно быть числом`);
    }
    return parsed;
}

export const createServiceService = async (
    dto: CreateServiceDTO,
    files?: Record<string, Express.Multer.File[]>,
    adminId?: number
) => {
    const {name, priority} = dto;

    const parsedPriority = priority
        ? parseOrThrow(String(priority), 'priority', 'int')
        : 100;

    let previewFileId: number | undefined;

    if (files && typeof files === 'object') {
        const uploaded = await handleFileUpload(files, adminId ?? 1);

        const preview = uploaded.find(
            (file) => file?.type === FileType.SERVICE_PREVIEW
        );
        if (preview) previewFileId = preview.id;
    }

    const service = await prisma.service.create({
        data: {
            name,
            priority: parsedPriority,
            ...(previewFileId && {
                previewFile: {
                    connect: {id: previewFileId},
                },
            }),
        },
        include: {
            previewFile: true,
        },
    });

    return service;
};
