import {Request, Response} from 'express';
import {deleteOrderService} from '../services';

export async function deleteOrder(req: Request, res: Response) {
    const id = Number(req.params.id);
    await deleteOrderService(id);
    res.json({success: true, message: 'Заказ удалён'});
}
