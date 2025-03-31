import {prisma} from '../../../db/prisma';

export async function getAllUsers() {
    const users = await prisma.user.findMany({
        include: {
            executorProfile: true,
            customerProfile: true,
        },
    });

    return users.map(({password, ...rest}) => rest);
}
