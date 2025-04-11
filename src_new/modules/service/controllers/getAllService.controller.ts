import {Request, Response} from 'express';
import {getAllServicesService} from '../services/getAllService.service';

export const getAllServices = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const services = await getAllServicesService();
        res.status(200).json(services);
        return;
    } catch (error) {
        res.status(500).json({message: 'Ошибка при получении сервисов'});
        return;
    }
};
