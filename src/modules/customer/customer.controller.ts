import {Request, Response} from 'express';
import {registerUser} from '../auth/services/register.service';

export async function register(req: Request, res: Response) {
    const result = await registerUser({
        ...req.body,
        role: 'CUSTOMER',
    });
    res.json(result);
}
