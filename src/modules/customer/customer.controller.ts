// src/modules/customer/customer.controller.ts
import {Request, Response} from 'express';
import {login as loginUser} from '../auth/login.service';
import {registerUser} from '../auth/register.service';

export async function register(req: Request, res: Response) {
    const token = await registerUser({
        ...req.body,
        role: 'CUSTOMER',
    });
    res.json({token});
}

export async function login(req: Request, res: Response) {
    const token = await loginUser(req.body);
    res.json({token});
}
