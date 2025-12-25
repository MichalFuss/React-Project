import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import '../styles.css';

const AdminDashboard = () => {
  const menuItems = [
    {
      title: "All Tickets",
      description: "View and manage all tickets in the system",
      icon: <AssignmentIcon className="dashboard-icon icon-blue" />,
      link: "/ticket",
      color: "#e3f2fd",
    },
    {
      title: "Manage Statuses",
      description: "Create and manage ticket statuses",
      icon: <SettingsIcon className="dashboard-icon icon-green" />,
      link: "/status",
      color: "#e8f5e9",
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts and roles",
      icon: <PeopleIcon className="dashboard-icon icon-red" />,
      link: "/users",
      color: "#ffebee",
    },
  ];

  return (
    <Container maxWidth="lg" className="admin-dashboard-container">
      <Typography variant="h3" className="admin-dashboard-title">
        Admin Dashboard
      </Typography>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        {menuItems.map((item) => (
          <div key={item.link} style={{ background: item.color, borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 220, maxWidth: 300, flex: '1 1 220px', margin: 8 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{item.icon}</div>
            <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>{item.title}</div>
            <div style={{ color: '#555', marginBottom: 16 }}>{item.description}</div>
            <Button variant="contained" component={RouterLink} to={item.link}>Open</Button>
          </div>
        ))}
      </div>
    </Container>
  );
};
export default AdminDashboard;