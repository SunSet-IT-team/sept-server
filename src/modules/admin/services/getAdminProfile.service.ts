import {prisma} from '../../../core/database/prisma';
import {getUserById} from '../../user/services/getUser';

export const getAdminProfileService = async (userId: number) => {
    const admin = await prisma.adminProfile.findUnique({
        where: {userId},
        include: {user: true},
    });

    if (!admin) throw new Error('Админ не найден');
    return getUserById(admin.userId);
};
