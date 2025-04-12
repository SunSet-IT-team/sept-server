import {prisma} from '../../../core/database/prisma';

export const getAdminProfileService = async (userId: string) => {
    const admin = await prisma.adminProfile.findUnique({
        where: {userId},
        include: {user: true},
    });

    if (!admin) throw new Error('Админ не найден');
    return admin;
};
