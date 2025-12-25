import axios from 'axios';
const API_URL = 'http://localhost:4000';

export const postCommentApi =async (ticketid:number, content: string, token: string)=>{
 const response = await axios.post(`${API_URL}/tickets/${ticketid}/comments`, {content}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
return  response.data;
}