import { Server } from 'socket.io';

const rooms: any[] = [];

export const setupSocket = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('createRoom', (data) => {
            const newRoom = {
                id: Date.now().toString(),
                gameId: data.gameId,
                name: data.roomName,
                price: `${data.entryFee} USDT`,
                players: 0,
                maxPlayers: 2,
            };

            rooms.push(newRoom);
            io.emit('roomsUpdate', rooms); // שולח לכל הלקוחות
            console.log(`Room created: ${newRoom.name}`);
        });

        socket.on('joinRoom', (roomId) => {
            const room = rooms.find((room) => room.id === roomId);
            if (room && room.players < room.maxPlayers) {
                room.players += 1;
                io.emit('roomsUpdate', rooms);
                socket.emit('joinedRoom', roomId);
                console.log(`User joined room: ${roomId}`);
            } else {
                socket.emit('joinError', 'Room is full or does not exist');
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};
