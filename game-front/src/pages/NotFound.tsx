import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgcolor="primary.main"
            color="white"
        >
            <Typography variant="h1" fontWeight="bold">
                404
            </Typography>
            <Typography variant="h4" sx={{ mt: 2 }}>
                Oops! Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 4 }}>
                The page you are looking for does not exist or has been moved.
            </Typography>
            <Button variant="contained" color="secondary" component={Link} to="/">
                Back to Home
            </Button>
        </Box>
    );
};

export default NotFound;
