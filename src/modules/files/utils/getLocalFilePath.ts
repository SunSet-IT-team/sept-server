import path from 'path';

export const getLocalFilePath = (filename: string) => {
    return path.join(__dirname, '../../../../uploads', filename);
};
