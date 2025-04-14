export interface ExecutorLoginProfileDto {
    id: number;
    workFormat: string;
    experience: number | null;
    about: string | null;
    companyName: string | null;
    completedOrders: number;
    city: string | null;
    rating: number | null;
    phone: string | null;
    profilePhoto: {
        id: number;
        url: string;
    } | null;
}
