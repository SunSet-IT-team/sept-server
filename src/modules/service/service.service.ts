import {prisma} from '../../db/prisma';

export async function createService(data: {name: string; priority?: number}) {
    return prisma.service.create({
        data: {
            name: data.name,
            priority: data.priority ?? 100,
        },
    });
}

export async function getAllServices() {
    return prisma.service.findMany({
        orderBy: {priority: 'asc'},
    });
}

export async function deleteService(id: number) {
    return prisma.service.delete({where: {id}});
}

export async function updatePriority(id: number, priority: number) {
    return prisma.service.update({
        where: {id},
        data: {priority},
    });
}
