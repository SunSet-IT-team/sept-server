import {Request, Response} from 'express';
import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {ForgotPasswordDTO} from '../dtos/forgotPassword.dto';
import {forgotPasswordService} from '../services/forgotPassword.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const forgotPassword = async (req: Request, res: Response) => {
    const dto = plainToInstance(ForgotPasswordDTO, req.body);
    const errors = await validate(dto);
    if (errors.length) {
        const msg = errors
            .map((e) => Object.values(e.constraints || {}).join(', '))
            .join('; ');
        return sendResponse(res, 400, errorResponse(msg));
    }
    try {
        await forgotPasswordService(dto.email);
        return sendResponse(
            res,
            200,
            successResponse({message: 'Код выслан на почту'})
        );
    } catch (err: any) {
        return sendResponse(res, 400, errorResponse(err.message));
    }
};
