import { useAuth } from "../context/auth/AuthContext";
import AdminDashboard from "./adminDashboard";
import AgentDashboard from "./agentDashboard";
import CustomerDashboard from "./customerDashboard";

const Dashboard = () => {
 const {user} = useAuth();
 const role = user?.role;
if (role === "admin") {
    return <AdminDashboard />;
}
if (role === "agent") {
    return <AgentDashboard />;
}
if (role === "customer") {
    return <CustomerDashboard />;
}
    return <></>
}
export default Dashboard;