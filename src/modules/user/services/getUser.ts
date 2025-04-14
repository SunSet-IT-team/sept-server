import {prisma} from '../../../core/database/prisma';
import {FileType} from '@prisma/client';
import {toUserDto} from '../utils/toUser';

export const getUserById = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            executorProfile: {
                include: {
                    orders: true,
                    user: {
                        include: {
                            files: {
                                where: {type: FileType.PROFILE_PHOTO},
                                select: {
                                    id: true,
                                    url: true,
                                    filename: true,
                                    type: true,
                                },
                            },
                        },
                    },
                },
            },
            customerProfile: {
                include: {
                    orders: true,
                    addresses: true,
                    user: {
                        include: {
                            files: {
                                where: {type: FileType.PROFILE_PHOTO},
                                select: {
                                    id: true,
                                    url: true,
                                    filename: true,
                                    type: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!user) throw new Error('Пользователь не найден');

    return toUserDto(user);
};
