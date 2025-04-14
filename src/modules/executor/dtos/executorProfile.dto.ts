export interface ExecutorProfileDto {
    id: number;
    workFormat: string;
    experience: number | null;
    about: string | null;
    companyName: string | null;
    description: string | null;
    completedOrders: number;
    rating: number | null;
    city: string | null;
    user: {
        email: string;
        fullName: string;
        phone: string | null;
        status: string;
    };
    profilePhoto: {
        id: number;
        url: string;
        filename: string;
        type: string;
    } | null;
}
