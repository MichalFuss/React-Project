import { useEffect, useState } from "react";
import { postTicketApi } from "../API/Tickets";
import { useAuth } from "../context/auth";
import { useTicket } from "../context/ticket/TicketContext";
import type { Proiority } from "../models/proiority";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import '../styles.css';

const NewTicketPage = () => {
  const { token } = useAuth();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const sendTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      await postTicketApi({ subject, description, priority_id: priority }, token!);
      setSubject("");
      setDescription("");
      setPriority(1);
      alert("Ticket created successfully!");
    } catch (err: any) {
      if (!err.response) {
        setSubmitError("Network error. Please check your connection.");
        return;
      }
      switch (err.response.status) {
        case 400:
          setSubmitError("Invalid ticket data. Please check your input.");
          break;
        case 500:
          setSubmitError("Server error. Please try again later.");
          break;
        default:
          setSubmitError(
            `An unknown error occurred (Status: ${err.response.status})`
          );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const { priorities, getPriorities } = useTicket();

  useEffect(() => {
    if (priorities.length === 0) {
      getPriorities();
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Box className="new-ticket-container">
        <Paper elevation={3} className="new-ticket-paper">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            className="new-ticket-title"
          >
            Create New Ticket
          </Typography>

          {submitError && (
            <Box className="new-ticket-error-box">
              <Typography variant="body2" color="error">
                {submitError}
              </Typography>
            </Box>
          )}

          <form onSubmit={sendTicket}>
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              variant="outlined"
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              margin="normal"
              multiline
              rows={5}
              required
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                label="Priority"
                onChange={(e) => setPriority(Number(e.target.value))}
                required
              >
                {priorities.map((prio: Proiority) => (
                  <MenuItem key={prio.id} value={prio.id}>
                    {prio.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="new-ticket-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Ticket"}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};
export default NewTicketPage;


