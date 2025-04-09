export function recoveryCodeGenerator(length: number = 6): string {
    // Исключены сложные для различения символы: 0/O, 1/I, 5/S
    const letters = 'ABCDEFGHJKLMNPQRTUVWXYZ';
    const numbers = '2346789';
    const allChars = letters + numbers;

    let result = '';
    for (let i = 0; i < length; i++) {
        result += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return result;
}
