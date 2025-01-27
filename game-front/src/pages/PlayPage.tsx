import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function PlayPage() {
    const { gameId, roomId } = useParams();

    useEffect(() => {
        const socket = io('http://localhost:3222');

        socket.on('connect', () => {
            console.log(`Connected with id: ${socket.id}`);
            socket.emit('joinRoom', { gameId, roomId });
        });

        socket.on('message', (msg) => {
            console.log('Message from server:', msg);
        });

        return () => {
            socket.disconnect();
        };
    }, [gameId, roomId]);

    return (
        <div>
            <h1>Play Page</h1>
            <p>Game ID: {gameId}</p>
            <p>Room ID: {roomId}</p>
        </div>
    );
}
