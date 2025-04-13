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

interface PaginateOptions<TWhere, TInclude, TOrderBy, TSelect> {
    defaultSortBy?: string;
    defaultOrder?: 'asc' | 'desc';
    include?: TInclude;
    select?: TSelect;
    orderMap?: Record<string, TOrderBy>;
    transformFilters?: (filters: Record<string, any>) => TWhere;
}

export async function paginate<
    T,
    TWhere = any,
    TInclude = any,
    TOrderBy = any,
    TSelect = any
>(
    model: {
        findMany: (args: {
            where?: TWhere;
            skip?: number;
            take?: number;
            orderBy?: TOrderBy;
            include?: TInclude;
            select?: TSelect;
        }) => Promise<T[]>;
        count: (args: {where?: TWhere}) => Promise<number>;
    },
    args: PaginationParams,
    options: PaginateOptions<TWhere, TInclude, TOrderBy, TSelect> = {}
): Promise<PaginatedResult<T>> {
    const page = Math.max(Number(args.page) || 1, 1);
    const limit = Math.max(Number(args.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const {sortBy, order = options.defaultOrder || 'desc', filters = {}} = args;

    const where = options.transformFilters
        ? options.transformFilters(filters)
        : ({} as TWhere);

    const resolvedSortBy = sortBy || options.defaultSortBy || 'createdAt';

    const orderBy: TOrderBy | undefined =
        options.orderMap?.[resolvedSortBy] ??
        ({[resolvedSortBy]: order} as unknown as TOrderBy);

    const [total, items] = await Promise.all([
        model.count({where}),
        model.findMany({
            where,
            skip,
            take: limit,
            orderBy,
            ...(options.select
                ? {select: options.select}
                : {include: options.include}),
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
