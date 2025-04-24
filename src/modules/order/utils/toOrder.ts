import {getUserById} from '../../user/services/getUser';
import {toUserDto} from '../../user/utils/toUser';

export const toOrderDto = async (order: any) => {
    const executorLoad = order.executor
        ? Promise.resolve(toUserDto(order.executor))
        : order.executorId
        ? getUserById(order.executorId)
        : Promise.resolve(null);

    const customerLoad = order.customer
        ? Promise.resolve(toUserDto(order.customer))
        : order.customerId
        ? getUserById(order.customerId)
        : Promise.resolve(null);

    const review = order.reviews?.[0];
    const reviewAuthorLoad = review?.author
        ? Promise.resolve(toUserDto(review.author))
        : review
        ? getUserById(review.authorId)
        : Promise.resolve(null);

    const [executor, customer, reviewAuthor] = await Promise.all([
        executorLoad,
        customerLoad,
        reviewAuthorLoad,
    ]);

    const reports =
        order.reports?.map((r: any) => ({
            id: r.id,
            text: r.text,
            total: r.total,
            createdAt: r.createdAt,
            files: (r.files ?? []).map((f: any) => ({
                id: f.id,
                url: f.url,
                type: f.type,
            })),
        })) ?? [];

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
        address: order.address,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,

        service: order.service
            ? {id: order.service.id, name: order.service.name}
            : null,

        executor,
        customer,
        reports,

        customerReview: review
            ? {
                  id: review.id,
                  rating: review.rating,
                  text: review.text,
                  createdAt: review.createdAt,
                  author: reviewAuthor,
              }
            : null,

        previewFile: order.previewFile
            ? {
                  id: order.previewFile.id,
                  url: order.previewFile.url,
                  type: order.previewFile.type,
                  mimetype: order.previewFile.mimetype,
              }
            : null,
    };
};
