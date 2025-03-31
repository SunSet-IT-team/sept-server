import {Request, Response} from 'express';
import * as AuthService from './auth.service';
import {AuthRequest} from '../../middleware/authMiddleware';
import {prisma} from '../../db/prisma';

export async function register(req: Request, res: Response) {
    try {
        const token = await AuthService.register(req.body);
        res.status(201).json({token});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function login(req: Request, res: Response) {
    try {
        const token = await AuthService.login(req.body);
        res.status(200).json({token});
    } catch (error: any) {
        res.status(401).json({message: error.message});
    }
}

export async function getMe(req: AuthRequest, res: Response): Promise<void> {
    try {
        if (!req.user) {
            res.status(401).json({message: 'Пользователь не авторизован'});
            return;
        }

        const user = await prisma.user.findUnique({
            where: {id: req.user.userId},
            include: {
                executorProfile: true,
                customerProfile: true,
            },
        });

        if (!user) {
            res.status(404).json({message: 'Пользователь не найден'});
            return;
        }

        const {password, ...safeUser} = user;

        res.json(safeUser);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}
