import axios from 'axios';
import type { Proiority } from '../models/proiority';


const API_URL = 'http://localhost:4000';
export const getProiorityApi = async (token:string): Promise<Proiority[]> => {
    const response = await axios.get(`${API_URL}/priorities`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const postProiorityApi = async (name: string,token:string): Promise<Proiority> => {
    const response = await axios.post(`${API_URL}/priorities`, { name }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}