import {Request, Response} from 'express';
import {UpdateServiceDTO} from '../dtos/updateService.dto';
import {updateServiceService} from '../services/updateService.service';

export const updateService = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {id} = req.params;
        const serviceData: UpdateServiceDTO = req.body;
        const updatedService = await updateServiceService(id, serviceData);
        if (!updatedService) {
            res.status(404).json({message: 'Сервис не найден'});
            return;
        }
        res.status(200).json(updatedService);
        return;
    } catch (error) {
        res.status(500).json({message: 'Ошибка при обновлении сервиса'});
        return;
    }
};
