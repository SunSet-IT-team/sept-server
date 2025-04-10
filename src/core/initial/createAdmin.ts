import {AccountStatus, Role} from '@prisma/client';
import {prisma} from '../db/prisma';
import bcrypt from 'bcrypt';

interface CreateAdminParams {
    email: string;
    password: string;
    code: string;
}

export const createAdmin = async ({
    email,
    password,
    code,
}: CreateAdminParams) => {
    const existingAdmin = await prisma.user.findUnique({where: {email}});
    if (existingAdmin) {
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: Role['ADMIN'],
            status: AccountStatus['VERIFIED'],
        },
    });

    return admin;
};
