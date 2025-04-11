import {prisma} from '../../../core/database/prisma';
import {comparePasswords} from '../utils/hashPassword';
import {Role} from '@prisma/client';
import {UnauthorizedError} from '../utils/errors';
import {LoginDTO} from '../dtos/login.dto';
import {generateToken} from '../utils/jwt';

export const loginService = async ({email, password}: LoginDTO) => {
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

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedError('Неверные учетные данные');
    }

    const token = generateToken({
        sub: user.id,
        role: user.role,
    });

    let safeProfile: Record<string, any> | null = null;

    switch (user.role) {
        case Role.EXECUTOR:
            if (user.executorProfile) {
                const {id, workFormat, experience, about, companyName} =
                    user.executorProfile;
                safeProfile = {id, workFormat, experience, about, companyName};
            }
            break;
        case Role.CUSTOMER:
            if (user.customerProfile) {
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
            break;
        case Role.ADMIN:
            safeProfile = null;
            break;
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
