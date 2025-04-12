import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {Request, Response, NextFunction} from 'express';
import {sendResponse, errorResponse} from './sendResponse';

function cleanObject<T extends Record<string, any>>(obj: T): T {
    const cleaned: any = {};
    for (const key in obj) {
        const value = obj[key];
        if (
            value !== undefined &&
            value !== null &&
            value !== '' &&
            !(Array.isArray(value) && value.length === 0)
        ) {
            cleaned[key] = value;
        }
    }
    return cleaned;
}

function normalizeArrayFields(obj: any, arrayFields: string[]) {
    for (const key of arrayFields) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key]
                .split(',')
                .map((item: string) => item.trim())
                .filter(Boolean);
        }
    }
}

export function validateDto(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        normalizeArrayFields(req.body, ['fileIdsToDelete']);

        const cleanedBody = cleanObject(req.body);
        const dto = plainToInstance(dtoClass, cleanedBody);

        const errors = await validate(dto, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });

        if (errors.length > 0) {
            const messages = errors
                .map((err) => Object.values(err.constraints || {}).join(', '))
                .join('; ');
            return sendResponse(res, 400, errorResponse(messages));
        }

        req.body = dto;
        next();
    };
}
