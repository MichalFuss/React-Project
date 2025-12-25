import { Dialog, DialogContent, DialogTitle, CircularProgress, Divider, Box, Select, MenuItem, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getTicketByIdApi, patchTicketApi } from "../API/Tickets";
import type { patchTicket, Ticket } from "../models/Ticket";
import { useAuth } from "../context/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import TicketDetails from "./TicketDetails";
import { postCommentApi } from "../API/comments";
import { useTicket } from "../context/ticket";
import { getUsersApi } from "../API/Users";
import type { User } from "../models/user";
import Loading from "../components/Loading";
import '../styles.css';



const TicketDetailsDialog = () => {
    const { user } = useAuth();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loadinghere, setLoading] = useState(false);
    const { token } = useAuth();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const effectiveTicketId = (id ? parseInt(id, 10) : null);
    const effectiveOpen = !!id;
    const [isAddComment, setIsAddComment] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState(false);
    const { status, getStatuses, loading } = useTicket();
    const [users, setUsers] = useState<User[]>([]);
 
    const addComment = () => {
        setIsAddComment(!isAddComment);
    }
    const postComment = async (ticketId: number, content: string) => {
        setLoading(true);
        try {
            await postCommentApi(ticketId, content, token!);
            setIsAddComment(false);
            setComments(!comments);
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

        }
        finally {
            setLoading(false);
        }
    };
    const patchTicket = async (ticketId: number, t: patchTicket, token: string) => {
        setLoading(true);
        try {
            await patchTicketApi(ticketId, t, token);
        } catch (err) {
            console.error("Failed to patch ticket", err);
            alert("Failed to update ticket");
        }
        finally {
            setLoading(false);
        }
    }
    const fetchFullData = async () => {
                setLoading(true);
                try {
                    const data = await getTicketByIdApi(effectiveTicketId!, token || "");
                    setTicket(data);
                } catch (err) {
                    console.error("Failed to load ticket details", err);
                } finally {
                    setLoading(false);
                }
            };
            const loadUsers = async () => {
                setLoading(true);
                try {
                    const usersData = await getUsersApi(token || "");
                    setUsers(usersData);
                } catch (err) {
                    console.error("Failed to load users", err);
                }
                finally {
                    setLoading(false);
                }
            };
    useEffect( () => {
        if (effectiveOpen && effectiveTicketId) {
            fetchFullData();
            if(user?.role==="admin")
                 loadUsers();
                if(user?.role==="admin" || user?.role==="agent")
            getStatuses();
        }
        
    }, [effectiveOpen, effectiveTicketId, token, comments]); // הוספנו את token למערך התלויות
   
  
    const handleClose = () => {
        navigate("/ticket");
    }
if(loading||loadinghere){
    <Loading />;
}
    return (
        <Dialog open={effectiveOpen} onClose={handleClose} fullWidth maxWidth="sm" scroll="paper">
            <DialogTitle>פרטי פנייה {effectiveTicketId ? `#${effectiveTicketId}` : ""}</DialogTitle>
            <DialogContent className="ticket-popup-dialog-content">
                {loadinghere ? (
                    <Box display="flex" justifyContent="center" p={3}><CircularProgress /></Box>
                ) : ticket ? (

                    <Box>
                        <TicketDetails ticket={ticket} />
                        <Divider className="ticket-popup-divider" />
                        {(user?.role === "agent" || user?.role === "customer") && (
                          <Button
                            onClick={addComment}
                            variant="outlined"
                            fullWidth
                            className="ticket-popup-status-select"
                          >
                            {isAddComment ? "Hide Comment" : "Add Comment"}
                          </Button>
                        )}
                        {isAddComment && (
                          <Box className="ticket-popup-comment-section">
                            <TextField
                              fullWidth
                              multiline
                              rows={4}
                              value={commentContent}
                              onChange={(e) => setCommentContent(e.target.value)}
                              placeholder="Add a comment..."
                              variant="outlined"
                              size="small"
                            />
                            <Button
                              onClick={() => postComment(effectiveTicketId!, commentContent)}
                              variant="contained"
                              fullWidth
                              className="ticket-popup-add-comment-btn"
                            >
                              Send Comment
                            </Button>
                          </Box>
                        )}
                        {(user?.role === "agent" || user?.role === "admin") && (
                          <Box className="ticket-popup-comment-item">
                            <Select
                              fullWidth
                              value={ticket.status_id}
                              onChange={async (e) => {
                                await patchTicket(
                                  ticket.id,
                                  {
                                    status_id: Number(e.target.value),
                                    priority_id: ticket.priority_id,
                                    assigned_to: ticket.assigned_to || 0,
                                  },
                                  token || ""
                                );
                                await fetchFullData();
                              }}
                              size="small"
                            >
                              <MenuItem disabled>
                                <em>Select Status</em>
                              </MenuItem>
                              {status.map((statusOption) => (
                                <MenuItem key={statusOption.id} value={statusOption.id}>
                                  {statusOption.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>
                        )}
                        {user?.role === "admin" && (
                          <Box className="ticket-popup-comment-item">
                            <Select
                              fullWidth
                              value={ticket.assigned_to || ""}
                              onChange={async (e) => {
                                const agentId = Number(e.target.value);
                                await patchTicket(
                                  ticket.id,
                                  {
                                    status_id: ticket.status_id,
                                    priority_id: ticket.priority_id,
                                    assigned_to: agentId,
                                  },
                                  token || ""
                                );
                                fetchFullData();
                              }}
                              size="small"
                            >
                              <MenuItem value="">
                                <em>Select Agent</em>
                              </MenuItem>
                              {users
                                .filter((userOption) => userOption.role === "agent")
                                .map((userOption) => (
                                  <MenuItem key={userOption.id} value={userOption.id}>
                                    {userOption.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </Box>
                        )}
                        <Box className="ticket-popup-comment-box">
                          <h4>Comments</h4>
                          {ticket.comments && ticket.comments.length > 0 ? (
                            ticket.comments.map((comment) => (
                              <Box
                                key={comment.id}
                                sx={{
                                  bgcolor: "#f5f5f5",
                                  p: 1.5,
                                  mb: 1,
                                  borderRadius: 1,
                                }}
                              >
                                <strong>{comment.author_name}:</strong>
                                <p style={{ margin: "4px 0 0 0" }}>
                                  {comment.content}
                                </p>
                              </Box>
                            ))
                          ) : (
                            <p style={{ color: "gray" }}>No comments to display.</p>
                          )}
                        </Box>
                    </Box>
                ) : (
                    <p>there is no ticket data </p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default TicketDetailsDialog;