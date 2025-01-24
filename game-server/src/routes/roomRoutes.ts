import express from 'express';
import { getRooms, createRoom, joinRoom } from '../controllers/roomController';

const router = express.Router();

router.get('/:gameNameFromUrl', getRooms);
router.post('/', createRoom);
router.post('/join', joinRoom);

export default router;
