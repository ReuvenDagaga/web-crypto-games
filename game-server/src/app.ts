
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import roomRoutes from './routes/roomRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);


export default app;
