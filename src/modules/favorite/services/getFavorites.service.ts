// src/modules/favorite/services/getFavorites.service.ts
import {prisma} from '../../../core/database/prisma';
import {Prisma, Favorite} from '@prisma/client';
import {getUserById} from '../../user/services/getUser';
import {UserDto} from '../../user/dto/user.dto';

export interface GetFavoritesParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    city?: string;
    minRating?: number;
    name?: string;
}

export const getFavoritesService = async (
    params: GetFavoritesParams,
    customerUserId: number
): Promise<{
    total: number;
    page: number;
    limit: number;
    pages: number;
    items: UserDto[];
}> => {
    const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        order = 'desc',
        city,
        minRating,
        name,
    } = params;

    // —— 1) Build `where` clause on Favorite ——
    const where: Prisma.FavoriteWhereInput = {customerId: customerUserId};

    // executor‐scoped filters live under `executor`
    const executorFilters: any = {};
    if (city) {
        executorFilters.executorProfile = {
            city: {contains: city, mode: 'insensitive'},
        };
    }
    if (minRating != null) {
        executorFilters.executorProfile = {
            ...executorFilters.executorProfile,
            rating: {gte: minRating},
        };
    }
    if (name) {
        // can match either firstName or lastName on the User
        executorFilters.OR = [
            {firstName: {contains: name, mode: 'insensitive'}},
            {lastName: {contains: name, mode: 'insensitive'}},
        ];
    }
    if (Object.keys(executorFilters).length) {
        where.executor = executorFilters;
    }

    // —— 2) Count total ——
    const total = await prisma.favorite.count({where});

    // —— 3) Build `orderBy` ——
    const dir = order === 'asc' ? 'asc' : 'desc';
    let orderBy: any;
    switch (sortBy) {
        case 'city':
            orderBy = {executor: {executorProfile: {city: dir}}};
            break;
        case 'rating':
            orderBy = {executor: {executorProfile: {rating: dir}}};
            break;
        case 'priority':
            orderBy = {executor: {executorProfile: {priority: dir}}};
            break;
        case 'firstName':
            orderBy = {executor: {firstName: dir}};
            break;
        case 'lastName':
            orderBy = {executor: {lastName: dir}};
            break;
        default:
            orderBy = {createdAt: dir};
    }

    // —— 4) Fetch this page ——
    const favorites = await prisma.favorite.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
            // pull in enough to filter/sort, but we'll map to full UserDto anyway
            executor: {
                include: {
                    executorProfile: true,
                    // you could also include files if you want them in the DTO’s profile
                },
            },
        },
    });

    // —— 5) Map to full UserDto via getUserById ——
    const items: UserDto[] = await Promise.all(
        favorites.map((fav) => getUserById(fav.executor.id))
    );

    return {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
        items,
    };
};
