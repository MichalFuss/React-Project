import { createContext, useContext, useEffect, useState } from "react";
import type { AuthResponse, LoginProps, RegisterProps } from "../../models/user";
import { getCurrentUserApi,  login, registerApi } from "../../API/Authentication";
import {  Navigate } from "react-router-dom";

interface AuthContextType {
    user:AuthResponse['user'] | null;
    token:string | null;
    Login: (credentials:LoginProps) => Promise<void>;
    Register: (data: RegisterProps) => Promise<void>;
    logout: () => void;
    getCurrentUser: (token: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    clearError: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<AuthResponse['user'] | null>(null);

    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token') ? localStorage.getItem('token') : null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const Login = async (credentials:LoginProps) => {
        setLoading(true);
        setError(null);
        try {
            // Call your login API here
           const response : AuthResponse = await login(credentials);
           if(response && response.user && response.token){
            setUser(response.user);
            setToken(response.token);
            localStorage.setItem('token', response.token);
           } else {
            setError("Invalid login response");
           }
        } catch (err: any) {
    // הגנה למקרה שאין תגובה מהשרת (למשל אין אינטרנט)
    if (!err.response) {
        setError("Network error. Please check your connection.");
        return;
    }

    const status = err.response.status;

    switch (status) {
        case 401:
            setError("Invalid email or password");
            break;
        case 403:
            setError("You do not have permission to perform this action.");
            break;
        case 404:
           <Navigate to="/notfound" replace />;
            break;
        case 409:
            setError("Conflict error. Please check your input.");
            break;
        case 500:
            setError("Server error. Please try again later.");
            break;
        default:
            setError(`An unknown error occurred (Status: ${status})`);
    }
} finally {
    setLoading(false);
    };
}
    const logout = () => {
        setUser(null);
        setToken(null);
        setError(null);
        localStorage.removeItem('token');
    };
    const clearError = () => {
        setError(null);
    };
    const Register = async (data: RegisterProps) => {
        setError(null);
        try {
            // Call your register API here
           await registerApi(data);
           await Login({email: data.email, password: data.password});
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
    }
 useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getCurrentUser(token);
        }
        else {
            setLoading(false);
        }
    }, []);
    const getCurrentUser = async (token: string) => {
        setLoading(true);
        setError(null);
        try{
           const CurrentUser= await getCurrentUserApi(token);
            setUser(CurrentUser);
        }
        catch(err:any){
             logout();
            switch (err.response.status) {
                case 401:
                    setError("Invalid token. Please log in again.");
                   
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
    }
    return (
        <AuthContext.Provider value={{user, token, Login, Register, logout, getCurrentUser, loading, error, clearError}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}