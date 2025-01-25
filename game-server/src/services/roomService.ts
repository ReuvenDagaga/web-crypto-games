import Rooms, { IRoom } from '../models/roomModel'

export const getRoomsService = async (gameNameFromUrl: string): Promise<IRoom[]> => {
    const rooms = await Rooms.find({isFull: false, gameType: gameNameFromUrl });
    return rooms
};

export const createRoomService = (name: string, gameType: string, price: number, maxPlayers: number, players: any[], isFull: boolean) => {
    const newRoom = new Rooms({
        id: Date.now().toString(),
        name,
        gameType,
        price,
        maxPlayers,
        players,
        isFull
    });
    Rooms.create(newRoom);
    return newRoom;
};

export const joinRoomService = async (roomId: string): Promise<IRoom> => {
    const currentRoom = await Rooms.findOne({ id: roomId });
    if (!currentRoom) throw new Error('Room not found');
    if (currentRoom.isFull) throw new Error('Room is full')
    currentRoom.players.push();
    if (currentRoom.players.length === currentRoom.maxPlayers) {
        currentRoom.isFull = true;
    }
    return await currentRoom.save();
};
