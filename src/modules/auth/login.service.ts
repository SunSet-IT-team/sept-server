import {prisma} from '../../db/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<string> {
    const user = await prisma.user.findUnique({where: {email}});

    if (!user) {
        throw new Error('Неверный email, пароль или роль');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Неверный email или пароль');
    }

    return jwt.sign({userId: user.id, role: user.role}, JWT_SECRET, {
        expiresIn: '7d',
    });
}
