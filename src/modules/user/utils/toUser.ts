import {Role} from '@prisma/client';
import {UserDto} from '../dto/user.dto';
import {toExecutorProfile} from './toExecutorProfile';
import {toCustomerProfile} from './toCustomerProfile';

export const toUserDto = (user: any): UserDto => {
    const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();

    let profile = null;
    if (user.role === Role.EXECUTOR && user.executorProfile) {
        profile = toExecutorProfile(
            user.executorProfile,
            user.files ?? [],
            user.phone
        );
    }
    if (user.role === Role.CUSTOMER && user.customerProfile) {
        profile = toCustomerProfile(
            user.customerProfile,
            user.files ?? [],
            user.phone,
            user.customerProfile.favoriteIds ?? []
        );
    }

    const ordersCount =
        (user._count?.customerOrders ?? 0) + (user._count?.executorOrders ?? 0);

    const reviewsGivenCount = user._count?.reviewsGiven ?? 0;
    const reviewsReceivedCount = user._count?.reviewsReceived ?? 0;
    const reviewCount =
        user.role === Role.CUSTOMER
            ? reviewsGivenCount
            : user.role === Role.EXECUTOR
            ? reviewsReceivedCount
            : 0;

    return {
        id: user.id,
        email: user.email,
        role: user.role,
        name: fullName,
        profile,
        ordersCount,
        reviewCount,
    };
};
