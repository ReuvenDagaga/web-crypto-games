import { Request, Response } from 'express';
import { createUserService, getUserDetailsService } from '../services/userService';
import { IUser } from '../models/userModel';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { walletAddress, username } = req.body;
        if (!walletAddress) {
            res.status(400).json({ message: 'Wallet address is required' });
        }
        const user = await createUserService({ walletAddress, username });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const getUserDetails = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'Wallet address is required' });
        }
        const user = await getUserDetailsService(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user details', error });
    }
};
