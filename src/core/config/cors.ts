export const getCorsChecker = () => {
    const rawList = process.env.CORS_WHITELIST || '';
    const whitelist = rawList
        .split(',')
        .map((entry) => entry.trim().toLowerCase());

    return (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
    ) => {
        if (!origin) return callback(null, true);

        try {
            const {hostname} = new URL(origin);

            const isAllowed = whitelist.some((allowedHost) => {
                if (
                    allowedHost === 'localhost' &&
                    hostname.startsWith('localhost')
                ) {
                    return true; // localhost с любым портом
                }
                if (hostname === allowedHost) return true;
                if (hostname.endsWith(`.${allowedHost}`)) return true; // поддомен
                return false;
            });

            if (isAllowed) {
                return callback(null, true);
            } else {
                console.warn(`CORS отказ: ${origin}`);
                return callback(new Error('CORS: origin не разрешён'));
            }
        } catch (err) {
            console.warn(`Ошибка парсинга origin: ${origin}`);
            return callback(new Error('Ошибка CORS'));
        }
    };
};
