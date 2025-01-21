import { io } from 'socket.io-client';
import { Room } from '../interfaces/Room'; 
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:3222');

export const createRoom = (roomData: Omit<Room, 'id' | 'players' | 'isFull'>) => {
    socket.emit('createRoom', {
        ...roomData,
        players: [],
        isFull: false
    });
};

export const joinRoom = (roomId: string) => {
    socket.emit('joinRoom', roomId);
};

socket.on('roomsUpdate', (rooms: Room[]) => {
    console.log('Updated rooms list:', rooms);
});

export default socket;
