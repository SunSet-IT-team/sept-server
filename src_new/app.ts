// src/app.ts
import express from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './core/config/swagger';

import {apiRouter} from './routes';
// import {createAdmin} from './core/initial/createAdmin';
import {Role} from '@prisma/client';
import path from 'path';

const email = process.env.ADMIN_EMAIL || 'admin@admin.com';
const password = process.env.ADMIN_PASSWORD || '123456';
const code = process.env.ADMIN_CODE || '123456';

const app = express();
app.use(
    cors({
        origin: '*',
    })
);
app.use(express.json());

app.use('/api', apiRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// createAdmin({email, password, code}).then((result) => {
//     console.log(result);
// });

export default app;
