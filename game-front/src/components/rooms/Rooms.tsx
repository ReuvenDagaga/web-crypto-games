import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Room } from '../../interfaces/Room';
import { useNavigate } from 'react-router-dom';
import { processPayment } from "../../services/walletService";
import { joinRoomService } from '../../services/roomService';

interface RoomsProps {
    rooms: Room[]
    gameId: string
}

const Rooms = ({ rooms, gameId }: RoomsProps) => {
    const navigate = useNavigate();

    const handleJoinRoom = async (roomId: string) => {
        try {
            const signature: any = await processPayment();
            if (!signature) {
                alert("Transaction failed. Please try again.");
                return;
            }
            const joinedRoom = await joinRoomService(roomId, signature); 
            if (joinedRoom) {
                navigate(`/game/${gameId}/${roomId}`);
            }          
        } catch {
            alert("An error occurred while joining the room.");
        }
    };

    return (
        <Box textAlign="center" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                Available Rooms
            </Typography>
            <List>
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <ListItem key={room.id} sx={{ borderBottom: '1px solid #ccc' }}>
                            <ListItemText
                                primary={`${room.name} - 0.01 SOL`}
                                secondary={`${room.players}/${room.maxPlayers} Players`}
                            />
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={() => handleJoinRoom(room.id)}
                            >
                                Join
                            </Button>
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body1">No rooms available</Typography>
                )}
            </List>
        </Box>
    );
};

export default Rooms;
