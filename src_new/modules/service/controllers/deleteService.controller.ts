import {Request, Response} from 'express';
import {deleteServiceService} from '../services/deleteService.service';

export const deleteService = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {id} = req.params;
        const deletedService = await deleteServiceService(id);
        if (!deletedService) {
            res.status(404).json({message: 'Сервис не найден'});
            return;
        }
        res.status(200).json({message: 'Сервис удален'});
        return;
    } catch (error) {
        res.status(500).json({message: 'Ошибка при удалении сервиса'});
        return;
    }
};
