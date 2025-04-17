import multer from 'multer';
import path from 'path';
import {v4 as uuidv4} from 'uuid';

const uploadDir = path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, uuidv4() + ext);
    },
});

export const upload = multer({storage});
