import {prisma} from '../../../db/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

interface LoginResult {
    success: boolean;
    token?: string;
    error?: string;
}

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<LoginResult> {
    try {
        const user = await prisma.user.findUnique({where: {email}});

        if (!user) {
            return {
                success: false,
                error: 'Неверный email, пароль или роль',
            };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                success: false,
                error: 'Неверный email или пароль',
            };
        }

        const token = jwt.sign({userId: user.id, role: user.role}, JWT_SECRET, {
            expiresIn: '7d',
        });

        return {
            success: true,
            token,
        };
    } catch (error) {
        return {
            success: false,
            error: 'Произошла ошибка при входе в систему',
        };
    }
}
