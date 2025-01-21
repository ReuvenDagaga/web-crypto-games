export interface Room {
    id: string;
    name: string;
    gameType: string;
    price: number;
    players: string[];
    maxPlayers: number;
    isFull: boolean;
}
