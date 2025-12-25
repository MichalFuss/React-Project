import axios from "axios";
const API_URL = "http://localhost:4000";
export const getUsersApi = async (token: string) => {
    const response = await axios.get(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}