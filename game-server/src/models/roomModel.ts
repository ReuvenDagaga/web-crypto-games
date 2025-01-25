import mongoose, { Schema, Document } from "mongoose";

interface ISignature {
    publicKey: string;
    transactionSignature: string;
}

export interface IRoom extends Document {
    name: string;
    gameType: string;
    price: number;
    players: ISignature[];
    maxPlayers: number;
    isFull: boolean;
}

const SignatureSchema: Schema = new Schema({
    publicKey: { type: String, required: true },
    transactionSignature: { type: String, required: true }
});

const RoomSchema: Schema = new Schema<IRoom>({
    name: { type: String, required: true },
    gameType: { type: String, required: true },
    price: { type: Number, required: true },
    players: { type: [SignatureSchema], default: [] },
    maxPlayers: { type: Number, default: 2 },
    isFull: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IRoom>("Room", RoomSchema);
