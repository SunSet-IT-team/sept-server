import {Response} from 'express';
import {ApiResponse} from '../types/response';

export const sendResponse = <T>(
    res: Response,
    statusCode: number,
    payload: ApiResponse<T>
): void => {
    res.status(statusCode).json(payload);
};

export const successResponse = <T>(
    data: T,
    message?: string
): ApiResponse<T> => ({
    success: true,
    data,
    ...(message && {message}),
});

export const errorResponse = (message: string): ApiResponse<null> => ({
    success: false,
    message,
});
