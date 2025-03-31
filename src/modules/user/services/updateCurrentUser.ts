import {prisma} from '../../../db/prisma';
import {normalizeCity} from '../../../helpers/normalizeCity';
import {UpdateUserDTO} from '../dto/updateUser.dto';

export async function updateCurrentUser(id: number, data: UpdateUserDTO) {
    const user = await prisma.user.findUnique({where: {id}});
    if (!user) throw new Error('Пользователь не найден');

    const updatedUser = await prisma.user.update({
        where: {id},
        data: {
            email: data.email,
            password: data.password,
        },
    });

    if (user.role === 'CUSTOMER' && data.address !== undefined) {
        await prisma.customerProfile.update({
            where: {userId: id},
            data: {address: data.address},
        });
    }

    if (user.role === 'EXECUTOR' && data.city !== undefined) {
        await prisma.executorProfile.update({
            where: {userId: id},
            data: {city: normalizeCity(data.city)},
        });
    }

    return updatedUser;
}
