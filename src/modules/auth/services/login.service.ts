import {prisma} from '../../../core/database/prisma';
import {comparePasswords} from '../utils/hashPassword';
import {Role, AccountStatus} from '@prisma/client';
import {UnauthorizedError} from '../utils/errors';
import {LoginDTO} from '../dtos/login.dto';
import {generateToken} from '../utils/jwt';

export const loginService = async (
    {email, password}: LoginDTO,
    expectedRole: Role
) => {
    const user = await prisma.user.findUnique({
        where: {email},
        include: {
            executorProfile: true,
            customerProfile: {
                include: {
                    orders: true,
                    addresses: true,
                },
            },
        },
    });

    if (!user) {
        throw new UnauthorizedError('Неверные учетные данные');
    }

    if (user.role !== expectedRole) {
        throw new UnauthorizedError('Неверный тип пользователя');
    }

    if (user.status !== AccountStatus.VERIFIED) {
        throw new UnauthorizedError('Подтвердите email перед входом');
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedError('Неверные учетные данные');
    }

    const token = generateToken({
        sub: user.id,
        role: user.role,
    });

    let safeProfile: Record<string, any> | null = null;

    if (user.role === Role.EXECUTOR && user.executorProfile) {
        const {id, workFormat, experience, about, companyName} =
            user.executorProfile;
        safeProfile = {id, workFormat, experience, about, companyName};
    }

    if (user.role === Role.CUSTOMER && user.customerProfile) {
        const {id, orders, addresses} = user.customerProfile;
        safeProfile = {
            id,
            ordersCount: orders.length,
            addresses: addresses.map((addr) => ({
                id: addr.id,
                value: addr.value,
            })),
        };
    }

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            profile: safeProfile,
        },
    };
};
