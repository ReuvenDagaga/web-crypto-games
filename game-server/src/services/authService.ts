
import User from '../models/userModel';

export const findOrCreateUser = async (walletAddress: string) => {
    let user = await User.findOne({ walletAddress });
    if (!user) {
        user = await User.create({ walletAddress });
    }
    return user;
};
