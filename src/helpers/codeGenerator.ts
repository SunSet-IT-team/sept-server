// src/helpers/codeGenerator.ts
/**
 * Генерируем 5-значный цифровой код подтверждения
 */
export function generateVerificationCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
}
