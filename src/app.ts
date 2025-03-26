// src/app.ts
import express from "express";
import cors from "cors";
import { userRouter } from "./modules/user/user.routes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

const app = express();
app.use(cors());
app.use(express.json());

// Подключаем роут
app.use("/api/users", userRouter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
