import { Request, Response } from 'express';
import { findOrCreateUser } from '../services/authService';

export const connectWallet = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(11111);

        const { walletAddress } = req.body;
        if (!walletAddress) {
            res.status(400).json({ message: 'Wallet address is required' });
            return;
        }
        console.log(11111);
        const user = await findOrCreateUser(walletAddress);
        
        res.status(200).json({ message: 'Wallet connected successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


