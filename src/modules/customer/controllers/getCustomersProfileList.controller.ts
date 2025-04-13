import {Request, Response} from 'express';
import {getCustomersListService} from '../services/getCustomersProfileList.service';
import {
    errorResponse,
    sendResponse,
    successResponse,
} from '../../../core/utils/sendResponse';

export const getCustomersList = async (req: Request, res: Response) => {
    try {
        const customers = await getCustomersListService(req.query);
        console.log('req.query =', req.query);

        sendResponse(res, 200, successResponse(customers));
    } catch (err: any) {
        sendResponse(res, 400, errorResponse(err.message));
    }
};
