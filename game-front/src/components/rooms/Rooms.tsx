import { Dispatch, useEffect } from 'react';
import socket from '../../services/roomService';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Room } from '../../interfaces/Room';
import { useNavigate } from 'react-router-dom';

interface RoomsProps {
    rooms: Room[]
    setRooms: Dispatch<React.SetStateAction<Room[]>> 
}

const Rooms = ({ rooms, setRooms} : RoomsProps) => {
    const navigate = useNavigate()
    useEffect(() => {
        socket.on('roomsUpdate', (updatedRooms) => {
            setRooms(updatedRooms);
        });

        return () => {
            socket.off('roomsUpdate');
        };
    }, []);

    function handleJoinRoom(roomId: string) {
        navigate('/2048')
    }


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
                                primary={`${room.name} - ${room.price} USDT`}
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
