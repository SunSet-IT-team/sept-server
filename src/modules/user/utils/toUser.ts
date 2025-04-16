import {Role} from '@prisma/client';
import {UserDto} from '../dto/user.dto';
import {toCustomerProfile} from './toCustomerProfile';
import {toExecutorProfile} from './toExecutorProfile';

export const toUserDto = (user: any): UserDto => {
    const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();

    let profile = null;

    // console.log(user);

    if (user.role === Role.EXECUTOR && user.executorProfile) {
        profile = toExecutorProfile(
            user.executorProfile,
            user.files || [],
            user.phone
        );
    }

    if (user.role === Role.CUSTOMER && user.customerProfile) {
        profile = toCustomerProfile(
            user.customerProfile,
            user.files || [],
            user.phone
        );
    }

    return {
        id: user.id,
        email: user.email,
        role: user.role,
        name: fullName,
        profile,
        customerOrdersCount: user.customerOrders?.length || 0,
        executorOrdersCount: user.executorOrders?.length || 0,
    };
};
