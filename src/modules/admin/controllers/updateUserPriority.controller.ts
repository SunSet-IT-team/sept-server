import {Request, Response, NextFunction} from 'express';
import {plainToInstance} from 'class-transformer';
import {validateOrReject} from 'class-validator';
import {UpdateUserPriorityDto} from '../dtos/updatePriority.dto';
import {updateUserPriorityService} from '../services/updateUserPriority.service';

export const updateUserPriorityController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = Number(req.params.userId);
        const dto = plainToInstance(UpdateUserPriorityDto, req.body);
        await validateOrReject(dto);

        const result = await updateUserPriorityService(userId, dto.priority);

        res.json(result);
    } catch (error) {
        next(error);
    }
};
