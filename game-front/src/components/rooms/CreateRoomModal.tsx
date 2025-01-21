import { Button, TextField, Typography } from "@mui/material";
import { Modal, Box } from "@mui/material";
import { useState } from "react";

interface CreateRoomModalProps {
    open: boolean;
    onClose: () => void;
    onCreate: (gameId: string, roomName: string, entryFee: string) => void;
    gameId: string;
}

const CreateRoomModal = ({ open, onClose, onCreate, gameId }: CreateRoomModalProps) => {
    const [roomName, setRoomName] = useState('');
    const [entryFee, setEntryFee] = useState('');

    const handleCreateRoom = () => {
        if (roomName && entryFee) {
            onCreate(gameId, roomName, entryFee);
            setRoomName('');
            setEntryFee('');
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box 
                sx={{
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: 400, 
                    bgcolor: 'background.paper', 
                    boxShadow: 24, 
                    p: 4,
                    borderRadius: 2,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h5" mb={2}>
                    Create a New Room for {gameId}
                </Typography>
                <TextField
                    label="Room Name"
                    fullWidth
                    variant="outlined"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Entry Fee (USDT)"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={entryFee}
                    onChange={(e) => setEntryFee(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleCreateRoom}>
                    Create Room
                </Button>
            </Box>
        </Modal>
    );
};

export default CreateRoomModal;