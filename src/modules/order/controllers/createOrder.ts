import {Response} from 'express';
import {AuthRequest} from '../../../middleware/authMiddleware';
import {createOrder as createOrderService} from '../services';
import {getUserIdFromRequest} from '../../../helpers/getUserByToken';

export async function createOrder(req: AuthRequest, res: Response) {
    try {
        const userId = getUserIdFromRequest(req);

        const order = await createOrderService({
            customerId: userId,
            ...req.body,
        });
        res.status(201).json(order);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
