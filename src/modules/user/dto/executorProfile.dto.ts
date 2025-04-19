import {FileType} from '@prisma/client';

export interface ExecutorProfileFileDto {
    id: number;
    url: string;
    type: FileType;
}

export interface ExecutorProfileDto {
    workFormat: string;
    experience: number | null;
    about: string | null;
    companyName: string | null;
    description: string | null;
    city: string;
    completedOrders: number;
    rating: number;
    phone: string | null;
    priority: number;

    profilePhotos: ExecutorProfileFileDto[];
    licenseDocs: ExecutorProfileFileDto[];
    registrationDocs: ExecutorProfileFileDto[];
}
