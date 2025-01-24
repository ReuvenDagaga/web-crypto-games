import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
    id: string;
    name: string;
    gameType: string;
    price: number;
    players: string[];
    maxPlayers: number;
    isFull: boolean;
}

const RoomSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    gameType: { type: String, required: true },
    price: { type: Number, required: true },
    players: { type: [String], default: [] },
    maxPlayers: { type: Number, required: true },
    isFull: { type: Boolean, default: false },
});

const Rooms = mongoose.model<IRoom>('Room', RoomSchema);
export default Rooms 
