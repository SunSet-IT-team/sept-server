import {Request, Response} from 'express';
import * as CustomerService from '../services';

export async function getCustomer(req: Request, res: Response): Promise<void> {
    try {
        const customer = await CustomerService.getCustomerById(
            Number(req.params.id)
        );
        if (!customer) {
            res.status(404).json({error: 'Заказчики не найдены'});
            return;
        }
        res.json(customer);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
}
