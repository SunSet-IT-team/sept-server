import {OrderStatus, FileType} from '@prisma/client';
import {UserDto} from '../../user/dto/user.dto';

/** Короткое описание файла, который хранится в БД */
export interface FileDto {
    id: number;
    url: string;
    type: FileType;
}

/** Один отчёт, прикреплённый к заказу */
export interface ReportDto {
    id: number;
    text: string | null;
    total: number;
    createdAt: Date;
    files: FileDto[];
}

export interface ReviewDto {
    id: number;
    rating: number; // 1‑5
    text: string;
    createdAt: Date;
    author: UserDto; // кто оставил отзыв
}

export interface OrderDto {
    id: number;

    title: string;
    objectType: string;
    comment: string | null;
    distanceToSeptic: number;
    septicDepth: number;
    septicVolume: number;
    septicConstructionType: string;
    paymentMethod: string;
    workDate: Date;
    status: OrderStatus;
    price: number | null;
    priority: number;
    city: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;

    /* Связанные сущности */
    service: {id: number; name: string} | null;

    executor: UserDto | null; // профиль исполнителя
    customer: UserDto | null; // профиль заказчика

    reports: ReportDto[]; // все отчёты
    customerReview: ReviewDto | null; // первый (или единственный) отзыв
}
