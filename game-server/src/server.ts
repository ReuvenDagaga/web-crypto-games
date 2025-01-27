import dotenv from 'dotenv';
import connectDB from './config/database';
import app from './app';
import { createServer } from 'http';
import initSocket from './socket/socketManager';

dotenv.config();

const PORT = process.env.PORT || 3222;

const server = createServer(app);

// Initialize WebSockets
initSocket(server);

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
