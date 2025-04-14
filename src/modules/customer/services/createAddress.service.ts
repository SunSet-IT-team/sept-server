import {prisma} from '../../../core/database/prisma';
import {CreateAddressDTO} from '../dtos/createAddress.dto';

export const createAddressService = async (
    userId: number,
    dto: CreateAddressDTO
) => {
    const customer = await prisma.customerProfile.findUnique({
        where: {userId},
    });

    if (!customer) {
        throw new Error('Профиль заказчика не найден');
    }

    if (dto.isDefault) {
        await prisma.address.updateMany({
            where: {userId: customer.id, isDefault: true},
            data: {isDefault: false},
        });
    }

    const address = await prisma.address.create({
        data: {
            value: dto.value,
            city: dto.city,
            postalCode: dto.postalCode,
            coordinates: dto.coordinates,
            isDefault: dto.isDefault ?? false,
            userId: customer.id,
        },
    });

    return address;
};
