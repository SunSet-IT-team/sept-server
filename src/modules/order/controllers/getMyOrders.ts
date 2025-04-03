import {Role} from '@prisma/client';
import {AuthRequest} from '../../../middleware/authMiddleware';
import {getOrdersByUser as getOrdersByUserService} from '../services';
import {Response} from 'express';

export async function getMyOrders(req: AuthRequest, res: Response) {
    try {
        const userId = req.user!.userId;
        const role = req.user!.role as Role;
        const status = req.query.status as any; // возможно, OrderStatus

        const orders = await getOrdersByUserService(userId, role, status);
        res.json(orders);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
