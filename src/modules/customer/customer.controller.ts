import {Request, Response} from 'express';
import {login as loginUser} from '../auth/login.service';
import {registerUser} from '../auth/register.service';
import * as CustomerService from './customer.service';
import {AuthRequest} from '../../middleware/authMiddleware';

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

export async function updateProfile(req: AuthRequest, res: Response) {
    try {
        const customerId = req.user!.userId;
        const {address} = req.body;

        const updated = await CustomerService.updateCustomerProfile(
            customerId,
            address
        );
        res.json(updated);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
