import {Request, Response} from 'express';
import * as CustomerService from '../services';

export async function listCustomers(req: Request, res: Response) {
    try {
        const result = await CustomerService.getCustomers({
            page: Number(req.query.page) || undefined,
            perPage: Number(req.query.perPage) || undefined,
            sortBy: req.query.sortBy as any,
            sortOrder: req.query.sortOrder as any,
            search: req.query.search as string,
        });
        res.json(result);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
}
