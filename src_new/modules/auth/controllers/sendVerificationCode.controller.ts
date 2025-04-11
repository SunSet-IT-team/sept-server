import {Request, Response} from 'express';
import {sendVerificationCodeService} from '../services/sendVerificationCode.service';

export const sendVerificationCode = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {email} = req.body;

    try {
        if (!email) {
            throw new Error('Email is required');
        }
        const result = await sendVerificationCodeService(email);
        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(400).json({message: error});
        return;
    }
};
