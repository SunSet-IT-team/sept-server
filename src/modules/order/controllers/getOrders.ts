import {Request, Response} from 'express';
import {getOrders as getOrdersService} from '../services/getOrders';

export async function getOrders(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const orders = await getOrdersService(page, limit);
    res.json(orders);
}
