import {Response} from 'express';
import {ApiResponse} from '../types/response';

export const sendResponse = (
    res: Response,
    statusCode: number,
    data: object
) => {
    const code = typeof statusCode === 'number' ? statusCode : 500;
    res.status(code).json(data);
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
