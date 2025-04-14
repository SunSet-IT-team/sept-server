export interface ExecutorProfileDto {
    workFormat: string;
    experience: number | null;
    about: string | null;
    companyName: string | null;
    description: string | null;
    city: string | null;
    completedOrders: number;
    rating: number | null;
    phone: string | null;
    priority: number;
    profilePhoto: {
        id: number;
        url: string;
        type: string;
    } | null;
}
