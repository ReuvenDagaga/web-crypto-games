// src/services/roomService.ts
import { Room, createRoomModel } from '../models/roomModel';

const rooms: Room[] = [];

export const getRooms = () => {
    return rooms.filter(room => !room.isFull);
};

export const createRoom = (name: string, gameType: string, price: number) => {
    const newRoom = createRoomModel(name, gameType, price);
    rooms.push(newRoom);
    return newRoom;
};

export const joinRoom = (roomId: string, playerId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) throw new Error('Room not found');
    if (room.isFull) throw new Error('Room is full');

    room.players.push(playerId);
    if (room.players.length === room.maxPlayers) {
        room.isFull = true;
    }
    return room;
};
