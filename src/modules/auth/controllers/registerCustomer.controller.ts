import {Request, Response} from 'express';
import {RegisterCustomerDTO} from '../dtos/registerCustomer.dto';
import {registerCustomerService} from '../services/registerCustomer.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const registerCustomer = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const dto: RegisterCustomerDTO | any = req.body;
        const user = await registerCustomerService(dto);

        sendResponse(res, 200, successResponse(user));
        return;
    } catch (err: any) {
        sendResponse(res, err.code || 400, errorResponse(err.message));
        return;
    }
};
