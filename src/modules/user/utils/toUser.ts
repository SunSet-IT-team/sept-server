import {Role} from '@prisma/client';
import {toExecutorProfile} from './toExecutorProfile';
import {toCustomerProfile} from './toCustomerProfile';
import {UserDto} from '../dto/user.dto';

export const toUserDto = (user: any): UserDto => {
    const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();

    let profile = null;

    if (user.role === Role.EXECUTOR && user.executorProfile) {
        profile = toExecutorProfile(user.executorProfile);
    }

    if (user.role === Role.CUSTOMER && user.customerProfile) {
        profile = toCustomerProfile(user.customerProfile);
    }

    return {
        id: user.id,
        email: user.email,
        role: user.role,
        name: fullName,
        profile,
    };
};
