import {Request, Response} from 'express';
import * as CustomerService from '../services';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export async function updateMe(req: Request, res: Response): Promise<void> {
    try {
        // 1. Получаем ID пользователя из токена
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({error: 'Требуется авторизация'});
            return;
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as {userId: number};
        const userId = decoded.userId;

        // 2. Вызываем сервис для обновления профиля
        const updatedCustomer = await CustomerService.updateCustomerProfile(
            userId, // Используем ID из токена, а не из параметров
            req.body.address,
            req.body.name
        );

        // 3. Формируем безопасный ответ без чувствительных данных
        const responseData = {
            id: updatedCustomer.id,
            email: updatedCustomer.name,
            name: updatedCustomer.address,
        };

        res.json(responseData);
    } catch (error: any) {
        console.error('Update profile error:', error);

        // Определяем статус код в зависимости от типа ошибки
        const statusCode = error instanceof jwt.JsonWebTokenError ? 401 : 500;

        res.status(statusCode).json({
            error: error?.message || 'Не удалось обновить профиль',
            ...(process.env.NODE_ENV === 'development' && {stack: error.stack}),
        });
    }
}
