// src/models/Room.ts
export interface Room {
    id: string;
    name: string;
    gameType: string;
    price: number;
    players: string[];
    maxPlayers: number;
    isFull: boolean;
}

export const createRoomModel = (name: string, gameType: string, price: number): Room => {
    return {
        id: Date.now().toString(),
        name,
        gameType,
        price,
        players: [],
        maxPlayers: 2,
        isFull: false,
    };
};
