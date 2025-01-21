import { AppBar, Toolbar, Button, Box, Menu, MenuItem, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { connectWallet } from '../services/authService';
import { useState } from 'react';

const Navbar = () => {
    const { walletAddress, setWallet, clearWallet } = useUserStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleConnect = async () => {
        const wallet = await connectWallet();
        if (wallet) setWallet(wallet);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDisconnect = () => {
        clearWallet();
        handleMenuClose();
    };

    return (
        <AppBar position="static" sx={{ bgcolor: 'rgba(0, 0, 0, 0.0)', width: '98.5vw' }}
        >
            <Toolbar>
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'inherit',
                        flexGrow: 1
                    }}
                >
                    <img
                        src="/logo.png"
                        alt="Logo"
                        style={{ width: 290, height: 130, marginRight: 10 }}
                    />
                </Box>

                {walletAddress ? (
                    <>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                sx: {
                                    width: 250,
                                    padding: 2
                                }
                            }}
                        >
                            <Typography variant="body1">Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</Typography>
                            <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Statistics</MenuItem>
                            <MenuItem onClick={handleDisconnect} color="error">
                                Disconnect
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button variant="contained" color="secondary" onClick={handleConnect}>
                        Connect Wallet
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
