import {Request, Response} from 'express';
import {uploadFilesService} from '../services/uploadFiles.service';
import {
    sendResponse,
    successResponse,
    errorResponse,
} from '../../../core/utils/sendResponse';

export const uploadFiles = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const files = req.files as Express.Multer.File[];

        if (!userId || !files || files.length === 0) {
            return sendResponse(res, 400, errorResponse('Файлы не найдены'));
        }

        const result = await uploadFilesService(files, userId);

        sendResponse(res, 201, successResponse(result));
    } catch (err) {
        console.error('[uploadFilesController]', err);
        sendResponse(res, 500, errorResponse('Ошибка загрузки файлов'));
    }
};
