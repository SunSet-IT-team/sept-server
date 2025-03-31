// src/app.ts
import express from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './docs/swagger';

import {apiRouter} from './routes';

const app = express();
app.use(cors());
app.use(express.json());

// Подключаем роут
app.use('/api', apiRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
