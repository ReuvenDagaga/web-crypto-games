// src/controllers/roomController.ts
import { Request, Response } from 'express';
import { getRooms, createRoom, joinRoom } from '../services/roomService';

export const getRoomsHandler = (req: Request, res: Response) => {
    res.json(getRooms());
};

export const createRoomHandler = (req: Request, res: Response) => {
    const { name, gameType, price } = req.body;
    const room = createRoom(name, gameType, price);
    res.status(201).json(room);
};

export const joinRoomHandler = (req: Request, res: Response) => {
    try {
        const { roomId, playerId } = req.body;
        const room = joinRoom(roomId, playerId);
        res.json(room);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
