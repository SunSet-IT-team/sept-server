// src/server.ts
import http from "http";
import app from "./app";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Запущен тут: http://localhost:${PORT}`);
});
