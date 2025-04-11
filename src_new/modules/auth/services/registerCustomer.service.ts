import {prisma} from '../../../core/database/prisma';
import bcrypt from 'bcrypt';
import {RegisterCustomerDTO} from '../dtos/registerCustomer.dto';
import {hashPassword} from '../utils/hashPassword';
import {Role} from '@prisma/client';

export const registerCustomerService = async (dto: RegisterCustomerDTO) => {
    const {email, password, firstName, lastName, phone, address} = dto;

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: Role['CUSTOMER'],
            firstName,
            lastName,
            phone,
            customerProfile: {
                create: {
                    addresses: {
                        create: {
                            value: address,
                        },
                    },
                },
            },
        },
        include: {
            customerProfile: {
                include: {
                    addresses: {
                        select: {
                            id: true,
                            value: true,
                        },
                    },
                    user: {
                        select: {
                            id: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                            phone: true,
                            role: true,
                            status: true,
                        },
                    },
                },
            },
        },
    });

    const customerId = user.customerProfile?.id;

    if (!customerId) throw new Error('Профиль не создан');

    return user;
};
