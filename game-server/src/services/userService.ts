import User, { IUser } from '../models/userModel';

interface CreateUserInput {
    walletAddress: string;
    username?: string;
}

export const createUserService = async (userData: CreateUserInput): Promise<IUser> => {
    const existingUser = await User.findOne({ walletAddress: userData.walletAddress });

    if (existingUser) {
        throw new Error('User with this wallet address already exists');
    }

    const newUser = new User({
        walletAddress: userData.walletAddress,
        username: userData.username || '',
        points: 0,
        totalGames: 0,
        totalWins: 0,
        totalVolumeUSDT: 0,
    });

    return await newUser.save();
};

export const getUserDetailsService = async (id: string): Promise<IUser | null> => {
    return await User.findOne({ _id: id });
};
