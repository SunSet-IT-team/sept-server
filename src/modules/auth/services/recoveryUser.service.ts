import {prisma} from '../../../core/database/prisma';
import {comparePasswords} from '../utils/hashPassword';
import {hashPassword} from '../utils/hashPassword';

export const changePasswordService = async (
    userId: number,
    oldPassword: string,
    newPassword: string
) => {
    const user = await prisma.user.findUnique({
        where: {id: userId},
    });

    if (!user) throw new Error('Пользователь не найден');

    const isMatch = await comparePasswords(oldPassword, user.password);
    if (!isMatch) throw new Error('Старый пароль указан неверно');

    if (oldPassword === newPassword) {
        throw new Error('Новый пароль не должен совпадать со старым');
    }

    const hashed = await hashPassword(newPassword);

    await prisma.user.update({
        where: {id: userId},
        data: {password: hashed},
    });

    return {message: 'Пароль успешно обновлён'};
};
