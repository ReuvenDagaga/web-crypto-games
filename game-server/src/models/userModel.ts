
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    walletAddress: string;
    username?: string;
    points: number;
    totalGames: number;
    totalWins: number;
    totalVolumeUSDT: number;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
    walletAddress: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
    },
    points: {
        type: Number,
        default: 0, // כמות הנקודות שהמשתמש צבר
    },
    totalGames: {
        type: Number,
        default: 0, // סך כל המשחקים ששיחק
    },
    totalWins: {
        type: Number,
        default: 0, // סך כל הנצחונות
    },
    totalVolumeUSDT: {
        type: Number,
        default: 0, // סך הווליום ששיחק ב-USDT
    },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
