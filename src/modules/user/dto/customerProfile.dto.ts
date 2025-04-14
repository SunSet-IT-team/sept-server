export interface CustomerProfileDto {
    id: number;
    ordersCount: number;
    phone: string | null;
    priority: number;
    profilePhoto: {
        id: number;
        url: string;
        filename: string;
        type: string;
    } | null;
    addresses: {
        id: number;
        value: string;
    }[];
}
