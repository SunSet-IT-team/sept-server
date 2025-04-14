export interface CustomerLoginProfileDto {
    id: number;
    ordersCount: number;
    phone: string | null;
    profilePhoto: {
        id: number;
        url: string;
    } | null;
    addresses: {
        id: number;
        value: string;
    }[];
}
