import {prisma} from '../../db/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Role} from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const SALT_ROUNDS = 10;

export async function register(data: {
    email: string;
    password: string;
    role: Role;
    city?: string;
    address?: string;
}) {
    const {email, password, role, city, address} = data;

    if (role === 'ADMIN') {
        throw new Error('Регистрация администратора запрещена');
    }

    const existingUser = await prisma.user.findUnique({where: {email}});
    if (existingUser) {
        throw new Error('Пользователь с таким email уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role,
        },
    });

    if (role === 'EXECUTOR' && city) {
        await prisma.executorProfile.create({
            data: {userId: user.id, city},
        });
    }

    if (role === 'CUSTOMER' && address) {
        await prisma.customerProfile.create({
            data: {userId: user.id, address},
        });
    }

    return jwt.sign({userId: user.id, role: user.role}, JWT_SECRET, {
        expiresIn: '7d',
    });
}

export async function login(data: {email: string; password: string}) {
    const {email, password} = data;

    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
        throw new Error('Неверный email или пароль');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Неверный email или пароль');
    }

    return jwt.sign({userId: user.id, role: user.role}, JWT_SECRET, {
        expiresIn: '7d',
    });
}
