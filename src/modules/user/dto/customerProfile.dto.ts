export interface CustomerProfileDto {
    ordersCount: number;
    phone: string | null;
    priority: number;
    profilePhoto: {
        id: number;
        url: string;
        filename: string;
        type: string;
    } | null;
    favoriteIds: {
        id: number;
    }[];
    addresses: {
        id: number;
        value: string;
    }[];
    reviewCount: number;
}
