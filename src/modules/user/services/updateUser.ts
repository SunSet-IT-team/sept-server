import {prisma} from '../../../db/prisma';
import {normalizeCity} from '../../../helpers/normalizeCity';
import {UpdateUserDTO} from '../dto/updateUser.dto';

export async function updateUser(id: number, data: UpdateUserDTO) {
    const existingUser = await prisma.user.findUnique({where: {id}});
    if (!existingUser) {
        throw new Error('Пользователь не найден');
    }

    const updatedUser = await prisma.user.update({
        where: {id},
        data: {
            email: data.email,
            password: data.password,
        },
    });

    if (existingUser.role === 'EXECUTOR' && data.city !== undefined) {
        await prisma.executorProfile.update({
            where: {userId: id},
            data: {city: normalizeCity(data.city)},
        });
    }

    if (existingUser.role === 'CUSTOMER' && data.address !== undefined) {
        await prisma.customerProfile.update({
            where: {userId: id},
            data: {address: data.address},
        });
    }

    return updatedUser;
}
