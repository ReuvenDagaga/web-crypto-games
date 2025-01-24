import { AppBar, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
