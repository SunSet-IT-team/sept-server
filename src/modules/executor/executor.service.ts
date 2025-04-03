// executor.service.ts
import {prisma} from '../../db/prisma';

export async function updateExecutorProfile(userId: number, city: string) {
    return prisma.executorProfile.update({
        where: {userId},
        data: {city},
    });
}
