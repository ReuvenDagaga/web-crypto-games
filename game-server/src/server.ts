import dotenv from 'dotenv';
import connectDB from './config/database';
import app from './app';
import http from 'http';

dotenv.config();

import { setupSocket } from './socket/socketManager';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});
setupSocket(io);

const PORT = process.env.PORT || 3222;

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
