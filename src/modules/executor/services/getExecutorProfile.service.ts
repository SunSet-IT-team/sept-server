import {prisma} from '../../../core/database/prisma';
import {FileType} from '@prisma/client';
import {toUserDto} from '../../user/utils/toUser';

export const getExecutorProfileService = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            executorProfile: {
                include: {
                    orders: true,
                    user: {
                        select: {
                            phone: true,
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

    if (!user || !user.executorProfile) {
        throw new Error('Профиль исполнителя не найден');
    }

    return toUserDto(user);
};
