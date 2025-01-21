import { create } from 'zustand';

interface UserState {
    walletAddress: string | null;
    setWallet: (wallet: string) => void;
    clearWallet: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    walletAddress: null,
    setWallet: (wallet) => set({ walletAddress: wallet }),
    clearWallet: () => set({ walletAddress: null }),
}));
