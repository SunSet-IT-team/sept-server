import {Request, Response} from 'express';
import {RegisterCustomerDTO} from '../dtos/registerCustomer.dto';
import {registerCustomerService} from '../services/registerCustomer.service';

export const registerCustomer = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const dto: RegisterCustomerDTO | any = req.body;
        const user = await registerCustomerService(dto);

        res.status(201).json({
            success: true,
            message: 'Регистрация успешна',
            data: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
            },
        });
        return;
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Ошибка регистрации',
            error: err,
        });
        return;
    }
};
