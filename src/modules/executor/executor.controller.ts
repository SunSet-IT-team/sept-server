import {Request, Response} from 'express';
import {registerUser} from '../auth/register.service';
import {login as loginUser} from '../auth/login.service';

export async function register(req: Request, res: Response) {
    const token = await registerUser({
        ...req.body,
        role: 'EXECUTOR',
    });
    res.json({token});
}

export async function login(req: Request, res: Response) {
    const token = await loginUser(req.body);
    res.json({token});
}
