import {Role} from '@prisma/client';
import {ExecutorProfileDto} from './executorProfile.dto';
import {CustomerProfileDto} from './customerProfile.dto';

export interface UserDto {
    id: number;
    email: string;
    role: Role;
    name: string;
    profile: ExecutorProfileDto | CustomerProfileDto | null;
    customerOrdersCount: number;
    executorOrdersCount: number;
}
