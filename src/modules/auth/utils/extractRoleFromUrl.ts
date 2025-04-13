// utils/extractRoleFromUrl.ts
import {Role} from '@prisma/client';

export const extractRoleFromUrl = (url: string): Role => {
    if (url.includes('executor')) return Role.EXECUTOR;
    if (url.includes('admin')) return Role.ADMIN;
    return Role.CUSTOMER;
};
