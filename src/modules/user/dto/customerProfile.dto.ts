export interface CustomerProfileDto {
    phone: string | null;
    priority: number;
    profilePhotos: {
        id: number;
        url: string;
        filename: string;
    }[];
    favoriteIds: {
        id: number;
    }[];
    addresses: {
        id: number;
        value: string;
    }[];
}
