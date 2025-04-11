import {Request, Response} from 'express';
import {registerExecutorService} from '../services/registerExecutor.service';

export const registerExecutor = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            phone,
            workFormat,
            experience,
            about,
            companyName,
        } = req.body;

        const files = req.files as Record<string, Express.Multer.File[]>;

        const data = await registerExecutorService({
            email,
            password,
            firstName,
            lastName,
            phone,
            workFormat,
            experience,
            about,
            companyName,
            files,
        });

        res.status(201).json({
            success: true,
            message: 'Регистрация успешна',
            data,
        });
        return;
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Ошибка регистрации',
            error: err,
        });
        return;
    }
};
