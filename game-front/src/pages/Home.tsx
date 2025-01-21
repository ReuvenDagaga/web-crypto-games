import { Container, Typography, Grid, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const games = [
    { id: '2048', name: '2048', description: 'Match the numbers and win!', link: '/game/2048' },
    { id: 'racing', name: 'Crypto Racing', description: 'Compete and win the race!', link: '/game/racing' },
];

const HomePage = () => {
    return (
        <Container>
            <Typography 
                variant="h3" 
                align="center" 
                sx={{ fontWeight: 'bold', mt: 4, color: 'primary.main' }}
            >
                Choose Your Game
            </Typography>
            
            <Grid 
                container 
                spacing={3} 
                justifyContent="center" 
                sx={{ mt: 4 }}
            >
                {games.map((game) => (
                    <Grid item xs={12} sm={6} md={4} key={game.id}>
                        <Box 
                            sx={{
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 3,
                                backgroundColor: 'background.paper',
                                borderRadius: 3,
                                boxShadow: 3
                            }}
                        >
                            <Typography variant="h5" fontWeight="bold">{game.name}</Typography>
                            <Typography variant="body1" color="text.secondary">{game.description}</Typography>
                            <Button 
                                component={Link} 
                                to={game.link} 
                                variant="contained" 
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Open Game Page
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;
