import {getUserById} from '../../user/services/getUser';

export const getCustomerProfileService = async (userId: number) => {
    const user = await getUserById(userId);

    if (!user || user.role !== 'CUSTOMER' || !user.profile) {
        throw new Error('Заказчик не найден');
    }

    return user;
};
