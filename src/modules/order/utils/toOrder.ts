import {toUserDto} from '../../user/utils/toUser';
import {getUserById} from '../../user/services/getUser';

export const toOrderDto = async (order: any) => {
    const executorUser = order.executorId
        ? await getUserById(order.executorId)
        : null;

    const customerUser = order.customerId
        ? await getUserById(order.customerId)
        : null;

    return {
        id: order.id,
        objectType: order.objectType,
        comment: order.comment,
        distanceToSeptic: order.distanceToSeptic,
        septicDepth: order.septicDepth,
        septicVolume: order.septicVolume,
        septicConstructionType: order.septicConstructionType,
        paymentMethod: order.paymentMethod,
        workDate: order.workDate,
        status: order.status,
        price: order.price,
        priority: order.priority,
        city: order.city,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,

        service: order.service
            ? {
                  id: order.service.id,
                  name: order.service.name,
              }
            : null,

        executor: executorUser,
        customer: customerUser,
    };
};
