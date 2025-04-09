import {Request, Response} from 'express';
import * as CustomerService from '../services';

export async function updateCustomer(req: Request, res: Response) {
    try {
        const customer = await CustomerService.updateCustomerProfile(
            Number(req.params.id),
            req.body.address,
            req.body.name
        );
        res.json(customer);
    } catch (error: any) {
        res.status(500).json({
            error: error?.message || 'Не удалось обновить профиль',
        });
    }
}
