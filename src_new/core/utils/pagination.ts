import {Prisma} from '@prisma/client';

export interface PaginationParams {
    page?: number | string;
    limit?: number | string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    filters?: Record<string, any>;
}

export interface PaginatedResult<T> {
    total: number;
    page: number;
    limit: number;
    pages: number;
    items: T[];
}

interface PaginateOptions<TWhere, TInclude, TOrderBy> {
    defaultSortBy?: string;
    defaultOrder?: 'asc' | 'desc';
    include?: TInclude;
    orderMap?: Record<string, TOrderBy>;
    transformFilters?: (filters: Record<string, any>) => TWhere;
}

export async function paginate<T, TWhere, TInclude, TOrderBy>(
    model: {
        findMany: (args: {
            where?: TWhere;
            skip?: number;
            take?: number;
            orderBy?: TOrderBy;
            include?: TInclude;
        }) => Promise<T[]>;
        count: (args: {where?: TWhere}) => Promise<number>;
    },
    args: PaginationParams,
    options: PaginateOptions<TWhere, TInclude, TOrderBy> = {}
): Promise<PaginatedResult<T>> {
    const page = Math.max(Number(args.page) || 1, 1);
    const limit = Math.max(Number(args.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const {sortBy, filters = {}} = args;

    const where = options.transformFilters
        ? options.transformFilters(filters)
        : ({} as TWhere);

    const orderBy =
        options.orderMap && sortBy && options.orderMap[sortBy]
            ? options.orderMap[sortBy]
            : options.orderMap?.[options.defaultSortBy || 'createdAt'];

    const [total, items] = await Promise.all([
        model.count({where}),
        model.findMany({
            where,
            skip,
            take: limit,
            orderBy,
            include: options.include,
        }),
    ]);

    return {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
        items,
    };
}
