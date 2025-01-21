// src/routes/roomRoutes.ts
import express from 'express';
import { getRoomsHandler, createRoomHandler, joinRoomHandler } from '../controllers/roomController';

const router = express.Router();

router.get('/rooms', getRoomsHandler);
router.post('/rooms', createRoomHandler);
router.post('/rooms/join', joinRoomHandler);

export default router;
