import axios from 'axios';
import type { Status } from '../models/status';
import { use } from 'react';

const API_URL = 'http://localhost:4000';
export const getStatusesApi = async (token:string): Promise<Status[]> => {
    const response = await axios.get(`${API_URL}/statuses`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const postStatusApi = async (name: string,token:string): Promise<Status> => {
    const response = await axios.post(`${API_URL}/statuses`, { name }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}