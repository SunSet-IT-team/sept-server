// src/modules/user/user.service.ts
import { prisma } from "../../db/prisma";
import { Role } from "@prisma/client";

interface CreateUserDTO {
    email: string;
    password: string;
    role: Role;
    city?: string; // Только для EXECUTOR
    address?: string; // Только для CUSTOMER
}
export async function createUser(data: CreateUserDTO) {
    const { email, password, role, city, address } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error("Пользователь с таким email уже существует");
    }

    const user = await prisma.user.create({
        data: {
            email,
            password,
            role,
        },
    });

    if (role === "EXECUTOR" && city) {
        await prisma.executorProfile.create({
            data: {
                userId: user.id,
                city,
            },
        });
    }

    if (role === "CUSTOMER" && address) {
        await prisma.customerProfile.create({
            data: {
                userId: user.id,
                address,
            },
        });
    }

    return user;
}

export async function getAllUsers() {
    return prisma.user.findMany({
        include: {
            executorProfile: true,
            customerProfile: true,
        },
    });
}

export async function getUserById(id: number) {
    return prisma.user.findUnique({
        where: { id },
        include: {
            executorProfile: true,
            customerProfile: true,
        },
    });
}

interface UpdateUserDTO {
    email?: string;
    password?: string;
    city?: string;
    address?: string;
}

export async function updateUser(id: number, data: UpdateUserDTO) {
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
        throw new Error("Пользователь не найден");
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            email: data.email,
            password: data.password,
        },
    });

    if (existingUser.role === "EXECUTOR" && data.city !== undefined) {
        await prisma.executorProfile.update({
            where: { userId: id },
            data: { city: data.city },
        });
    }

    if (existingUser.role === "CUSTOMER" && data.address !== undefined) {
        await prisma.customerProfile.update({
            where: { userId: id },
            data: { address: data.address },
        });
    }

    return updatedUser;
}

export async function deleteUser(id: number) {
    await prisma.executorProfile.deleteMany({
        where: { userId: id },
    });
    await prisma.customerProfile.deleteMany({
        where: { userId: id },
    });
    return prisma.user.delete({
        where: { id },
    });
}
