// src/modules/auth/register.service.ts
import {prisma} from '../../db/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const SALT_ROUNDS = 10;

type RegisterUserParams =
    | {
          role: 'CUSTOMER';
          email: string;
          password: string;
          address: string;
      }
    | {
          role: 'EXECUTOR';
          email: string;
          password: string;
          city: string;
      }
    | {
          role: 'ADMIN';
          email: string;
          password: string;
      };

export async function registerUser(data: RegisterUserParams): Promise<string> {
    const {email, password, role} = data;

    const existingUser = await prisma.user.findUnique({where: {email}});
    if (existingUser) {
        throw new Error('Пользователь с таким email уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createData: any = {
        email,
        password: hashedPassword,
        role,
    };

    if (role === 'CUSTOMER') {
        createData.customerProfile = {
            create: {
                address: (data as any).address,
            },
        };
    }

    if (role === 'EXECUTOR') {
        createData.executorProfile = {
            create: {
                city: (data as any).city,
            },
        };
    }

    const user = await prisma.user.create({
        data: createData,
    });

    return jwt.sign({userId: user.id, role: user.role}, JWT_SECRET, {
        expiresIn: '7d',
    });
}
