import { createContext, useContext, useEffect, useState } from "react";
import type { Proiority } from "../../models/proiority";
import type { Status } from "../../models/status";
import { getStatusesApi } from "../../API/statuses";
import { useAuth } from "../auth";
import { getProiorityApi } from "../../API/proiority";
import { Navigate } from "react-router-dom";

interface TicketContextType {
    status: Status[];
    priorities: Proiority[];
    getStatuses: () => Promise<void>;
    getPriorities: () => Promise<void>;
    loading: boolean;
    error: string | null;
}
const TicketContext = createContext<TicketContextType | undefined>(undefined);
export const TicketProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const {token, user} = useAuth();
    const [status, setStatus] = useState<Status[]>([]);
    const [priorities, setPriorities] = useState<Proiority[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const getStatuses = async () => {
        setLoading(true);
        setError(null);
        try {
            // Call your API here to get statuses
            const response = await getStatusesApi(token || "");
            setStatus(response);
        } catch (err: any) {
            if (!err.response) {
                setError("Network error. Please check your connection.");
                return;
            }
            switch (err.response.status) {
                case 400:
                    setError("Invalid registration data. Please check your input.");
                    break;
                case 409:
                    setError("Email already in use. Please use a different email.");
                    break;
                case 404:
                   <Navigate to="/notfound" replace />;
                    break;
                case 500:
                    setError("Server error. Please try again later.");
                    break;  
                default:
                    setError(`An unknown error occurred (Status: ${err.response.status})`);
            }

        }
        finally {
            setLoading(false);
        }
    };
    const getPriorities = async () => {
        setLoading(true);
        setError(null);
        try {
            // Call your API here to get priorities
         const response = await getProiorityApi(token || "");
            setPriorities(response);
        } catch (err: any) {
            if (!err.response) {
                setError("Network error. Please check your connection.");
                return;
            }
            switch (err.response.status) {
                case 400:
                    setError("Invalid registration data. Please check your input.");
                    break;
                case 409:
                    setError("Email already in use. Please use a different email.");
                    break;
                case 404:
                   <Navigate to="/notfound" replace />;
                    break;
                case 500:
                    setError("Server error. Please try again later.");
                    break;  
                default:
                    setError(`An unknown error occurred (Status: ${err.response.status})`);
            }

        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (token){
            if(user?.role==="admin"){
                getStatuses();}
        getPriorities();
        }
        
    }, [token, user]);
    return (
        <TicketContext.Provider value={{status, priorities, getStatuses, getPriorities, loading, error}}>
            {children}
        </TicketContext.Provider>
    );
}
export const useTicket = () => {
    const context = useContext(TicketContext);
    if (context === undefined) {
        throw new Error("useTicket must be used within a TicketProvider");
    }
    return context;
}