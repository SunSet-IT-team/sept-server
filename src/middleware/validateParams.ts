import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {Request, Response, NextFunction} from 'express';

export function validateParams<T extends object>(
    paramName: string,
    dtoClass: new () => T
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const value = Number(req.params[paramName]);
        const dto = plainToInstance(dtoClass, {executorId: value} as object);
        const errors = await validate(dto);

        if (errors.length > 0) {
            res.status(400).json({
                message: 'Ошибка валидации параметра',
                errors: errors.map((e) => ({
                    property: e.property,
                    constraints: e.constraints,
                })),
            });
            return;
        }

        next();
    };
}
