import { useEffect, useState } from "react";
import type { Ticket } from "../models/Ticket";
import { getTicketApi } from "../API/Tickets";
import { useAuth } from "../context/auth";
import TicketDetails from "./TicketDetails";
import TicketDetailsDialog from "./TicketPopUp";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Container, Box, Typography, Stack } from "@mui/material";
import '../styles.css';

const TicketList = () => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getTickets = async () => {
    setIsLoading(true);
    try {
      const ticketsData = await getTicketApi(token || "");
      setTickets(ticketsData);
    } catch (err: any) {
      if (!err.response) {
        alert("Network error. Please check your connection.");
        return;
      }
      switch (err.response.status) {
        case 400:
          alert("Invalid registration data. Please check your input.");
          break;
        case 409:
          alert("Email already in use. Please use a different email.");
          break;
        case 404:
          <Navigate to="/notfound" replace />;
          break;
        case 500:
          alert("Server error. Please try again later.");
          break;
        default:
          alert(`An unknown error occurred (Status: ${err.response.status})`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) getTickets();
  }, [token]);

  const handleOpenDetails = (id: number) => {
    navigate(`/ticket/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" className="ticket-list-container">
      <Typography variant="h4" className="ticket-list-title">
        Tickets
      </Typography>

      {tickets.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="textSecondary">
            No tickets found
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {tickets.map((ticket) => (
            <Box
              key={ticket.id}
              onClick={() => handleOpenDetails(ticket.id)}
              className="ticket-card"
            >
              <TicketDetails ticket={ticket} />
            </Box>
          ))}
        </Stack>
      )}

      <TicketDetailsDialog />
    </Container>
  );
};
export default TicketList;