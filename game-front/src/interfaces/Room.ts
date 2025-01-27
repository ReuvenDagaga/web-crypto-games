import { Signature } from "./Signature";

export interface Room {
    id: string;
    name: string;
    gameType: string;
    price: number;
    players: Signature[];
    maxPlayers: number;
    isFull: boolean;
    isActive: boolean;
}
