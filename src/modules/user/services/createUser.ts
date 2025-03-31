import {prisma} from '../../../db/prisma';
import {CreateUserDTO} from '../dto/createUser.dto';

export async function createUser(data: CreateUserDTO) {
    const {email, password, role, city, address} = data;

    const existingUser = await prisma.user.findUnique({where: {email}});
    if (existingUser) {
        throw new Error('Пользователь с таким email уже существует');
    }

    const user = await prisma.user.create({
        data: {
            email,
            password,
            role,
        },
    });

    if (role === 'EXECUTOR' && city) {
        await prisma.executorProfile.create({
            data: {
                userId: user.id,
                city,
            },
        });
    }

    if (role === 'CUSTOMER' && address) {
        await prisma.customerProfile.create({
            data: {
                userId: user.id,
                address,
            },
        });
    }

    return user;
}
