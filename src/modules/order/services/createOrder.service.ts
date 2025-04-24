import {prisma} from '../../../core/database/prisma';
import {CreateOrderDTO} from '../dtos/createOrder.dto';
import {OrderStatus, FileType} from '@prisma/client';
import {toOrderDto} from '../utils/toOrder';
import {handleFileUpload} from '../utils/files/handleFileUpload';

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

export const createOrderService = async (
    dto: CreateOrderDTO,
    customerId: number,
    files?: Record<string, Express.Multer.File[]>
) => {
    const {
        objectType,
        comment,
        distanceToSeptic,
        septicDepth,
        septicVolume,
        septicConstructionType,
        paymentMethod,
        workDate,
        city,
        serviceId,
        executorId,
        price,
        address,
    } = dto;

    const parsedExecutorId = parseOrThrow(executorId, 'executorId', 'int');
    const parsedServiceId = parseOrThrow(serviceId, 'serviceId', 'int');

    const user = await prisma.user.findUnique({
        where: {id: parsedExecutorId},
    });

    if (!user) throw new Error('Исполнитель не найден');
    if (user.role !== 'EXECUTOR')
        throw new Error('Пользователь не исполнитель');

    let previewFileId: number | undefined;

    if (files && typeof files === 'object') {
        const uploaded = await handleFileUpload(files, customerId);

        const preview = uploaded.find(
            (file) => file?.type === FileType.ORDER_PREVIEW
        );
        if (preview) previewFileId = preview.id;
    }

    const data: any = {
        objectType,
        comment,
        distanceToSeptic: parseOrThrow(
            distanceToSeptic,
            'distanceToSeptic',
            'float'
        ),
        septicDepth: parseOrThrow(septicDepth, 'septicDepth', 'float'),
        septicVolume: parseOrThrow(septicVolume, 'septicVolume', 'float'),
        septicConstructionType,
        paymentMethod,
        workDate: new Date(workDate),
        city,
        address: address ?? '',
        status: OrderStatus.PENDING,
        priority: 100,
        customer: {
            connect: {id: customerId},
        },
        executor: {
            connect: {id: parsedExecutorId},
        },
        service: {
            connect: {
                id: parsedServiceId,
            },
        },
    };

    if (price) {
        data.price = parseOrThrow(price, 'price', 'float');
    }

    if (previewFileId) {
        data.previewFile = {
            connect: {
                id: previewFileId,
            },
        };
    }

    const order = await prisma.order.create({
        data,
        include: {
            service: true,
            customer: true,
            executor: true,
            previewFile: true,
        },
    });

    return await toOrderDto(order);
};
