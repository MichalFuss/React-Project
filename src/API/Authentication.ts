import axios from "axios";
import type { LoginProps, RegisterProps } from "../models/user";


const API_URL = "http://localhost:4000/auth";

export const login = async (data: LoginProps) => {
   const res = await axios.post(`${API_URL}/login`, data);
    return res.data;
}

export const registerApi = async (data: RegisterProps) => {
    const res = await axios.post(`${API_URL}/register`, data);
}

export const getCurrentUserApi = async (token: string) => {
    const res = await axios.get(`${API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}