import {Request, Response} from 'express';
import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {ResetPasswordDTO} from '../dtos/resetPassword.dto';
import {resetPasswordService} from '../services/resetPassword.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const resetPassword = async (req: Request, res: Response) => {
    const dto = plainToInstance(ResetPasswordDTO, req.body);
    const errors = await validate(dto);
    if (errors.length) {
        const msg = errors
            .map((e) => Object.values(e.constraints || {}).join(', '))
            .join('; ');
        return sendResponse(res, 400, errorResponse(msg));
    }

    try {
        await resetPasswordService(dto.email, dto.code, dto.newPassword);
        return sendResponse(
            res,
            200,
            successResponse({message: 'Пароль успешно обновлён'})
        );
    } catch (err: any) {
        return sendResponse(res, 400, errorResponse(err.message));
    }
};
