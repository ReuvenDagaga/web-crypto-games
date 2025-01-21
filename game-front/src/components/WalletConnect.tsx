import { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import { useUserStore } from '../store/userStore';
import { connectWallet } from '../services/authService';

const WalletConnect = () => {
    const { walletAddress, setWallet, clearWallet } = useUserStore();
    const [loading, setLoading] = useState(false);

    const handleConnect = async () => {
        setLoading(true);
        const wallet = await connectWallet();
        if (wallet) {
            setWallet(wallet);
        }
        setLoading(false);
    };
    const handleDisconnect = async () => {
        clearWallet();
        if ('solana' in window) {
            const provider = (window as any).solana;
            if (provider.isPhantom && provider.isConnected) {
                await provider.disconnect();
            }
        }
    
        setTimeout(() => {
            if ((window as any).solana?.isConnected) {
                console.warn('Phantom wallet is still connected');
            } else {
                console.log('Wallet disconnected successfully');
            }
        }, 1000);
    };
    

    return (
        <Box textAlign="center" sx={{ mt: 4 }}>
            {walletAddress ? (
                <>
                    <Typography variant="h6">Connected Wallet:</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </Typography>
                    <Button variant="contained" color="error" onClick={handleDisconnect}>
                        Disconnect
                    </Button>
                </>
            ) : (
                <Button 
                    variant="contained" 
                    onClick={handleConnect} 
                    disabled={loading}
                    sx={{ minWidth: 160 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Connect Wallet'}
                </Button>
            )}
        </Box>
    );
};

export default WalletConnect;
