import axios from "axios"
import type { patchTicket, Ticket ,newTicket } from "../models/Ticket";
const API_URL = "http://localhost:4000";

export const getTicketApi = async (token:string): Promise<Ticket[]> => {
    const response = await axios.get(`${API_URL}/tickets`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}
export const getTicketByIdApi = async (id: number, token: string): Promise<Ticket> => {
    const response = await axios.get(`${API_URL}/tickets/${id}`,{
        headers: {
            Authorization : `Bearer ${token}`
        }
    });
    return response.data;
}
export const patchTicketApi = async (id: number,patch:patchTicket, token: string) => {
    const response = await axios.patch(`${API_URL}/tickets/${id}`, patch, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}
export const postTicketApi = async (newTicket: newTicket, token: string): Promise<Ticket> => {
    const response = await axios.post(`${API_URL}/tickets`, newTicket, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}
