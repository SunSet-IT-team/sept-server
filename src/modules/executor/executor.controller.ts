import {Request, Response} from 'express';
import {registerUser} from '../auth/services/register.service';
import {login as loginUser} from '../auth/services/login.service';
import {AuthRequest} from '../../middleware/authMiddleware';
import * as ExecutorService from './executor.service';

export async function register(req: Request, res: Response) {
    const result = await registerUser({
        ...req.body,
        role: 'EXECUTOR',
    });
    res.json(result);
}

export async function login(req: Request, res: Response) {
    const result = await loginUser(req.body);
    res.json(result);
}

export async function updateProfile(req: AuthRequest, res: Response) {
    try {
        const executorId = req.user!.userId;
        const {city} = req.body;

        const updated = await ExecutorService.updateExecutorProfile(
            executorId,
            city
        );
        res.json(updated);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
