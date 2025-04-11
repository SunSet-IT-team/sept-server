import http from 'http';
import app from './app';
// import {initSocket} from './modules/chat';

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

// initSocket(server);

server.listen(PORT, () => {
    console.log(`Запущен тут: http://localhost:${PORT}`);
});
