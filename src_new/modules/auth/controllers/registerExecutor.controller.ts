import {Request, Response} from 'express';
import {registerExecutorService} from '../services/registerExecutor.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';
import {RegisterExecutorDTO} from '../dtos/registerExecutor.dto';

export const registerExecutor = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const dto: RegisterExecutorDTO = req.body;
        const files = req.files as Record<string, Express.Multer.File[]>;

        const result = await registerExecutorService({...dto, files});

        sendResponse(res, 200, successResponse(result));
        return;
    } catch (err: any) {
        sendResponse(res, err.code || 400, errorResponse(err.message));
        return;
    }
};
