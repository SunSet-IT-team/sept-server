import {Request, Response} from 'express';
import {sendProtectedFile} from '../services/getProtectedFile.service';
import {sendResponse, errorResponse} from '../../../core/utils/sendResponse';

export const getProtectedFileController = async (
    req: Request,
    res: Response
) => {
    try {
        const {filename} = req.params;
        const user = req.user!;

        await sendProtectedFile({filename, user, res});
    } catch (err: any) {
        sendResponse(
            res,
            err.statusCode || 400,
            errorResponse(err.message || 'Ошибка получения файла')
        );
    }
};
