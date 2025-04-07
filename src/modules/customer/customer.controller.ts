import {Request, Response} from 'express';
import {login as loginUser} from '../auth/services/login.service';
import {registerUser} from '../auth/services/register.service';
import * as CustomerService from './customer.service';
import {AuthRequest} from '../../middleware/authMiddleware';
import {verifyCode} from '../auth/services/verifyCode.service';

export async function register(req: Request, res: Response) {
    const result = await registerUser({
        ...req.body,
        role: 'CUSTOMER',
    });
    res.json(result);
}

export async function login(req: Request, res: Response) {
    const result = await loginUser(req.body);
    res.json(result);
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

export async function verification(req: AuthRequest, res: Response) {}
