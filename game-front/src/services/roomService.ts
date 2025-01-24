import axios from 'axios';
import { Room } from '../interfaces/Room';

export const getRoomsService = async (gameNameFromUrl: string) => {
    try {
        const response = await axios.get<Room[]>(`/api/rooms/${gameNameFromUrl}`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching rooms:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch rooms');
    }
};

