import {Request, Response} from 'express';
import {getServiceByIdService} from '../services/getServiceById.service';

export const getService = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {id} = req.params;
        const service = await getServiceByIdService(id);
        if (!service) {
            res.status(404).json({message: 'Сервис не найден'});
            return;
        }
        res.status(200).json(service);
        return;
    } catch (error) {
        res.status(500).json({message: 'Ошибка при получении сервиса'});
        return;
    }
};
