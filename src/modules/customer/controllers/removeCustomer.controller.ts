import {Request, Response} from 'express';
import {deleteCustomer} from '../services';

export async function deleteCustomerController(req: Request, res: Response) {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({error: 'user ID с ошибкой'});
        }

        const result = await deleteCustomer(userId);
        res.json({
            success: true,
            message: 'Пользователь удалён',
            data: {
                id: result.id,
                status: result.status,
            },
        });
    } catch (error: any) {
        console.error('Ошибка при удалении:', error);
        res.status(400).json({
            success: false,
            error: error.message || 'Ошибка при удалении',
        });
    }
}
