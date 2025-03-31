import {Request, Response} from 'express';
import * as OrderService from './order.service';
import {AuthRequest} from '../../middleware/authMiddleware';

export async function createOrder(req: AuthRequest, res: Response) {
    try {
        const customerId = req.user!.userId;
        const order = await OrderService.createOrder({
            customerId,
            ...req.body,
        });
        res.status(201).json(order);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function getOrders(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const orders = await OrderService.getOrders(page, limit);
    res.json(orders);
}

export async function updateStatus(req: AuthRequest, res: Response) {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const executorId = req.user!.userId;

        const updated = await OrderService.updateOrderStatus(
            Number(id),
            executorId,
            status
        );
        res.json(updated);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
