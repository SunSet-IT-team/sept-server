import {Request, Response} from 'express';
import {changePasswordService} from '../services/recoveryUser.service';
import {
    sendResponse,
    errorResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const changePassword = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {oldPassword, newPassword} = req.body;

        if (!oldPassword || !newPassword) {
            sendResponse(res, 400, errorResponse('Оба поля обязательны'));
            return;
        }

        if (oldPassword === newPassword) {
            sendResponse(
                res,
                400,
                errorResponse('Новый пароль не должен совпадать со старым')
            );
            return;
        }

        const userId = Number(req.user?.id);
        const result = await changePasswordService(
            userId,
            oldPassword,
            newPassword
        );

        sendResponse(res, 200, successResponse(result));
    } catch (err: any) {
        sendResponse(
            res,
            err.statusCode || 400,
            errorResponse(err.message || 'Ошибка при смене пароля')
        );
    }
};
