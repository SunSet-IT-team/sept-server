import {Request, Response} from 'express';
import {adminRecoveryService} from '../services/adminRecovery.service';

export const adminRecovery = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {email, code, newPassword} = req.body;

    try {
        const result = await adminRecoveryService(email, code, newPassword);
        res.status(200).json(result);
        return;
    } catch (error) {
        console.error(error);
        res.status(400).json({message: error});
        return;
    }
};
