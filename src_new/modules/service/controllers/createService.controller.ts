import {Request, Response} from 'express';
import {CreateServiceDTO} from '../dtos/createService.dto';
import {createServiceService} from '../services/createService.service';

export const createService = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {name, priority} = req.body;
        const dto: CreateServiceDTO = {name, priority};
        const service = await createServiceService(dto);
        res.status(201).json(service);
        return;
    } catch (error) {
        res.status(500).json({message: 'Ошибка при создании сервиса'});
        return;
    }
};
