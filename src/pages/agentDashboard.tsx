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
import AssignmentIcon from "@mui/icons-material/Assignment";
import '../styles.css';

const AgentDashboard = () => {
  return (
    <Container maxWidth="lg" className="agent-dashboard-container">
      <Typography variant="h3" className="agent-dashboard-title">
        Agent Dashboard
      </Typography>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ background: '#e3f2fd', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 220, maxWidth: 300, flex: '1 1 220px', margin: 8 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}><AssignmentIcon className="dashboard-icon icon-blue" /></div>
          <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>View Tickets</div>
          <div style={{ color: '#555', marginBottom: 16 }}>View and manage assigned tickets</div>
          <Button variant="contained" component={RouterLink} to="/ticket">Open</Button>
        </div>
      </div>
    </Container>
  );
};
export default AgentDashboard;