import { Request, Response } from "express";
import {
  getRoomsService,
  createRoomService,
  joinRoomService,
} from "../services/roomService";


export const getRooms = async (req: Request, res: Response) => {
  const gameNameFromUrl = req.params.gameNameFromUrl;
  if (gameNameFromUrl) {
    const rooms = await getRoomsService(gameNameFromUrl);
    res.json(rooms);
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
};

export const createRoom = (req: Request, res: Response) => {
  const {
    name,
    gameType,
    price,
    maxPlayers,
    players,
    isFull = false,
  } = req.body;  
  if (name && gameType && price && maxPlayers && players && isFull === false) {
    const room = createRoomService(
      name,
      gameType,
      price,
      maxPlayers,
      players,
      isFull
    );
    res.status(201).json(room);
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
};

export const joinRoom = (req: Request, res: Response) => {
  try {
    const { roomId, signature } = req.body;
    if(!roomId || !signature) throw new Error('Invalid request');
    const room = joinRoomService(roomId, signature);
    res.json(room);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
