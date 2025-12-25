import { AuthProvider } from "../context/auth/AuthContext";
import { TicketProvider } from "../context/ticket";


interface AppProviderProps {
  children: React.ReactNode;
}
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <TicketProvider>
        {children}
      </TicketProvider>
    </AuthProvider>
  );
}
export default AppProvider;