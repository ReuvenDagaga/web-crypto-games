import axios from 'axios';
import { Room } from '../interfaces/Room';

const API_URL = 'http://localhost:3222/api/rooms';

export const getRoomsService = async (gameNameFromUrl: string) => {
    try {
        const response = await axios.get<Room[]>(`${API_URL}/${gameNameFromUrl}`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching rooms:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch rooms');
    }
};

export const createRoomService = async (roomData: Omit<Room, "id">): Promise<Room> => {
    console.log(roomData);
    
    const response = await axios.post(API_URL, roomData);
    return response.data;
  };

  export const joinRoomService = async (roomId: string, signature: any): Promise<Room> => {
    const response = await axios.post(`${API_URL}/${roomId}/join`, { signature });
    return response.data;
  };

