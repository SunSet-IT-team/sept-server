import {prisma} from '../../../db/prisma';

export async function deleteUser(id: number) {
    await prisma.executorProfile.deleteMany({
        where: {userId: id},
    });
    await prisma.customerProfile.deleteMany({
        where: {userId: id},
    });
    return prisma.user.delete({
        where: {id},
    });
}
