export const getPagination = (
    page: string | undefined,
    limit: string | undefined,
    sortBy: string | undefined,
    sortOrder: 'asc' | 'desc' | undefined
) => {
    const pageNumber = parseInt(page || '1', 10);
    const pageSize = parseInt(limit || '10', 10);

    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const orderBy = sortBy
        ? {
              [sortBy]: sortOrder || 'asc',
          }
        : undefined;

    return {skip, take, orderBy};
};
