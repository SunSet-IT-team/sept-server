import {prisma} from '../../../db/prisma';

export async function getUserById(id: number) {
    const user = await prisma.user.findUnique({
        where: {id},
        include: {
            executorProfile: true,
            customerProfile: true,
        },
    });

    if (!user) return null;

    const {password, ...safeUser} = user;
    return safeUser;
}
