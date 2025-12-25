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
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import '../styles.css';

const CustomerDashboard = () => {
  const menuItems = [
    {
      title: "Create New Ticket",
      description: "Submit a new support ticket",
      icon: <AddIcon className="dashboard-icon icon-blue" />,
      link: "/ticket/new",
      color: "#e3f2fd",
    },
    {
      title: "View My Tickets",
      description: "Check the status of your tickets",
      icon: <ListIcon className="dashboard-icon icon-green" />,
      link: "/ticket",
      color: "#e8f5e9",
    },
  ];

  return (
    <Container maxWidth="lg" className="customer-dashboard-container">
      <Typography variant="h3" className="customer-dashboard-title">
        Customer Dashboard
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
export default CustomerDashboard;