import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(dtoClass, req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            res.status(400).json({
                message: "Ошибка валидации",
                errors: errors.map((e) => ({
                    property: e.property,
                    constraints: e.constraints,
                })),
            });
            return;
        }

        req.body = dto;
        next();
    };
}
