import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}

/**
 * Хелпер для получения ID пользователя из JWT токена
 * @param token - JWT токен из заголовка Authorization
 * @returns ID пользователя
 * @throws UnauthorizedError если токен невалидный или отсутствует
 */
export function getUserIdFromToken(token: string): number {
    if (!token) {
        throw new UnauthorizedError('Требуется авторизация');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {userId: number};
        if (!decoded.userId) {
            throw new UnauthorizedError('Невалидный токен: отсутствует userId');
        }
        return decoded.userId;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new UnauthorizedError('Срок действия токена истек');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new UnauthorizedError('Невалидный токен авторизации');
        }
        throw new UnauthorizedError('Ошибка проверки токена');
    }
}

/**
 * Хелпер для получения пользователя по токену из заголовка Authorization
 * @param authHeader - Заголовок Authorization (формат: "Bearer <token>")
 * @returns ID пользователя
 * @throws UnauthorizedError если токен невалидный или отсутствует
 */
export function getUserIdFromAuthHeader(
    authHeader: string | undefined
): number {
    if (!authHeader) {
        throw new UnauthorizedError('Отсутствует заголовок авторизации');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedError(
            'Неверный формат токена. Ожидается: Bearer <token>'
        );
    }

    return getUserIdFromToken(token);
}

/**
 * Полный хелпер для получения пользователя из запроса
 * @param req - Express Request объект
 * @returns ID пользователя
 * @throws UnauthorizedError если токен невалидный или отсутствует
 */
export function getUserIdFromRequest(req: {
    headers: {authorization?: string};
}): number {
    return getUserIdFromAuthHeader(req.headers.authorization);
}
