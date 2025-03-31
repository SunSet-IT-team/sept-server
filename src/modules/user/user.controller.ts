// src/modules/user/user.controller.ts
import {Request, Response} from 'express';
import * as UserService from './services';
import {AuthRequest} from '../../middleware/authMiddleware';

export async function createUser(req: Request, res: Response) {
    try {
        const newUser = await UserService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const user = await UserService.getUserById(Number(id));
        if (!user) {
            res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const updated = await UserService.updateUser(Number(id), req.body);
        res.json(updated);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const {id} = req.params;
        await UserService.deleteUser(Number(id));
        res.json({message: 'Пользователь удалён'});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function updateMe(req: AuthRequest, res: Response) {
    try {
        const updated = await UserService.updateCurrentUser(
            req.user!.userId,
            req.body
        );
        res.json(updated);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
