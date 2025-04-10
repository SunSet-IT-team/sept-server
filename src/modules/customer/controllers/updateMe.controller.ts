import {Request, Response} from 'express';
import * as CustomerService from '../services';
import jwt from 'jsonwebtoken';
import {getUserIdFromRequest} from '../../../helpers/getUserByToken';

export async function updateMe(req: Request, res: Response): Promise<void> {
    try {
        const userId = getUserIdFromRequest(req);

        const updatedCustomer = await CustomerService.updateCustomerProfile(
            userId, // Используем ID из токена, а не из параметров
            req.body.address,
            req.body.name
        );

        const responseData = {
            id: updatedCustomer.id,
            name: updatedCustomer.name,
            address: updatedCustomer.address,
        };

        res.json(responseData);
    } catch (error: any) {
        console.error('Ошибка обновления профиля:', error);

        // Определяем статус код в зависимости от типа ошибки
        const statusCode = error instanceof jwt.JsonWebTokenError ? 401 : 500;

        res.status(statusCode).json({
            error: error?.message || 'Не удалось обновить профиль',
        });
    }
}
