import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import Rooms from "../components/rooms/Rooms";
import CreateRoomModal from "../components/rooms/CreateRoomModal";
import { Room } from "../interfaces/Room";
import { getRoomsService } from "../services/roomService";

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

  const handleCreateRoom = (
    gameId: string,
    roomName: string,
    entryFee: string
  ) => {
    setRooms((prevRooms) => [
      ...prevRooms,
      {
        id: Date.now().toString(),
        name: roomName,
        gameType: gameId,
        price: parseInt(entryFee),
        players: [],
        maxPlayers: 2,
        isFull: false,
      },
    ]);
    setOpenModal(false);
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
      <Rooms rooms={rooms} setRooms={setRooms} />
      <CreateRoomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreateRoom}
        gameId={gameId || ""}
      />
    </Box>
  );
};

export default GamePage;
