import type { Ticket } from "../models/Ticket";
import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";
import '../styles.css';

const TicketDetails: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  return (
    <Card className="ticket-details-card">
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6" component="div" className="ticket-details-subject">
              {ticket.subject}
            </Typography>
          </Box>

          <Typography variant="body2" color="textSecondary">
            {ticket.description}
          </Typography>

          <Box className="ticket-chips-container">
            <Chip
              label={ticket.status_name}
              color="primary"
              variant="outlined"
              size="small"
            />
            <Chip
              label={ticket.priority_name}
              color="error"
              variant="outlined"
              size="small"
            />
          </Box>

          <Stack className="ticket-details-info">
            <Box>
              <Typography variant="caption" color="textSecondary">
                Created by
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {ticket.created_by_name}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="textSecondary">
                Assigned to
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {ticket.assigned_to_name || "Unassigned"}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="textSecondary">
                Created
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {new Date(ticket.created_at).toLocaleDateString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="textSecondary">
                Updated
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {new Date(ticket.updated_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default TicketDetails;