import {Request, Response} from 'express';
import * as ServiceService from './service.service';

export async function createService(req: Request, res: Response) {
    try {
        const service = await ServiceService.createService(req.body);
        res.status(201).json(service);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function getServices(req: Request, res: Response) {
    const services = await ServiceService.getAllServices();
    res.json(services);
}

export async function deleteService(req: Request, res: Response) {
    try {
        const {id} = req.params;
        await ServiceService.deleteService(Number(id));
        res.json({message: 'Услуга удалена'});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export async function updatePriority(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const {priority} = req.body;
        const updated = await ServiceService.updatePriority(
            Number(id),
            priority
        );
        res.json(updated);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}
