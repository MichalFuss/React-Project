import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../context/auth";
import { useTicket } from "../context/ticket";
import Loading from "../components/Loading";
import { postStatusApi } from "../API/statuses";
import '../styles.css';

const Status = () => {
  const { status, getStatuses, loading } = useTicket();
  const { token } = useAuth();
  const [newStatusName, setNewStatusName] = useState("");
  const [addError, setAddError] = useState("");

  const handleAdd = async () => {
    if (!newStatusName.trim()) {
      setAddError("Status name cannot be empty");
      return;
    }

    try {
      await postStatusApi(newStatusName, token!);
      await getStatuses();
      setNewStatusName("");
      setAddError("");
    } catch (err: any) {
      if (!err.response) {
        setAddError("Network error. Please check your connection.");
        return;
      }
      switch (err.response.status) {
        case 400:
          setAddError("Invalid status data. Please check your input.");
          break;
        case 409:
          setAddError("Status already exists.");
          break;
        case 500:
          setAddError("Server error. Please try again later.");
          break;
        default:
          setAddError(
            `An unknown error occurred (Status: ${err.response.status})`
          );
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="md" className="status-container">
      <Typography variant="h4" className="status-title">
        Manage Statuses
      </Typography>

      <Paper elevation={2} className="status-add-paper">
        <Typography variant="h6" className="status-add-title">
          Add New Status
        </Typography>
        {addError && (
          <Box
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: "#ffebee",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="error">
              {addError}
            </Typography>
          </Box>
        )}
        <Stack className="status-add-form">
          <TextField
            placeholder="Status name"
            value={newStatusName}
            onChange={(e) => {
              setNewStatusName(e.target.value);
              setAddError("");
            }}
            fullWidth
            variant="outlined"
            size="small"
          />
          <Button
            onClick={handleAdd}
            variant="contained"
            startIcon={<AddIcon />}
            className="status-textfield"
          >
            Add
          </Button>
        </Stack>
      </Paper>

      <Paper elevation={2} className="status-display-paper">
        <Typography variant="h6" className="status-display-title">
          Current Statuses
        </Typography>
        {status.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No statuses found
          </Typography>
        ) : (
          <Box className="status-chips">
            {status.map((s) => (
              <Chip
                key={s.id}
                label={s.name}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
};
export default Status;