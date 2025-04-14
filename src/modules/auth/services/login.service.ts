import {prisma} from '../../../core/database/prisma';
import {comparePasswords} from '../utils/hashPassword';
import {Role, AccountStatus} from '@prisma/client';
import {UnauthorizedError} from '../utils/errors';
import {LoginDTO} from '../dtos/login.dto';
import {generateToken} from '../utils/jwt';
import {getUserById} from '../../user/services/getUser';

export const loginService = async (
    {email, password}: LoginDTO,
    expectedRole: Role
) => {
    const user = await prisma.user.findUnique({
        where: {email},
    });

    if (!user) throw new UnauthorizedError('Неверные учетные данные');

    if (user.role !== expectedRole)
        throw new UnauthorizedError('Неверный тип пользователя');

    if (user.status !== AccountStatus.VERIFIED)
        throw new UnauthorizedError('Подтвердите email перед входом');

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid)
        throw new UnauthorizedError('Неверные учетные данные');

    const userDto = await getUserById(user.id);

    const token = generateToken({sub: user.id, role: user.role});

    return {
        token,
        user: userDto,
    };
};
