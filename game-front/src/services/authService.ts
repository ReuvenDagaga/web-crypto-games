import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const connectWallet = async (): Promise<string | null> => {
    try {
        if ('solana' in window) {
            const provider = (window as any).solana;
            if (provider.isPhantom) {
                // ניתוק הארנק תחילה כדי להבטיח אישור מחדש
                await provider.disconnect();

                // פתיחה מחדש של הארנק ודרישה לאישור מהמשתמש
                const response = await provider.connect({ onlyIfTrusted: false });

                const walletAddress = response.publicKey.toString();
                await axios.post(`${API_URL}/auth/connect-wallet`, { walletAddress });

                return walletAddress;
            }
        }
        throw new Error('Phantom wallet not found');
    } catch (error) {
        console.error('Error connecting wallet:', error);
        return null;
    }
};
