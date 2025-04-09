import {Request, Response} from 'express';
import {login as loginUser} from '../services/login.service';

export async function login(req: Request, res: Response) {
    const result = await loginUser(req.body);
    res.json(result);
}
