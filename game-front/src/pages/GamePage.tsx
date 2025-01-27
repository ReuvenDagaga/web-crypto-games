import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import Rooms from "../components/rooms/Rooms";
import CreateRoomModal from "../components/rooms/CreateRoomModal";
import { Room } from "../interfaces/Room";
import { getRoomsService, createRoomService } from "../services/roomService";
import { Signature } from "../interfaces/Signature";



const GamePage = () => {
  const { gameId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!gameId) return;
      const rooms = await getRoomsService(gameId);
      setRooms(rooms);
    };
    fetchRooms();
  }, [gameId]);


  const handleCreateRoom = async (gameId: string, roomName: string, entryFee: string, signature: Signature) => {
    try {
      const newRoom = await createRoomService({
        name: roomName,
        gameType: gameId,
        price: parseInt(entryFee),
        maxPlayers: 2,
        players:  [signature],
        isFull: false,
        isActive: true
      });
      if (!newRoom) {
        throw new Error("Failed to create room");
      }
      setRooms((prevRooms) => [...prevRooms, newRoom]);
      setOpenModal(false);
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };
  

  return (

    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4">Welcome to {gameId}</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpenModal(true)}
      >
        Create New Room
      </Button>
      {rooms && (
        <Rooms rooms={rooms} gameId={gameId!} />
      )}
      <CreateRoomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreateRoom}
        gameId={gameId!}
      />
    </Box>
  );
};

export default GamePage;
