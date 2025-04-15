import {AccountStatus, Role} from '@prisma/client';
import {prisma} from '../database/prisma';
import {hashPassword} from '../../modules/auth/utils/hashPassword';

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

    const hashedPassword = await hashPassword(password);

    const admin = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName: 'Admin',
            role: Role.ADMIN,
            status: AccountStatus.VERIFIED,
            adminProfile: {
                create: {
                    recoveryCode: code,
                },
            },
        },
    });

    return {adminID: admin.id, email: admin.email, password: password};
};
