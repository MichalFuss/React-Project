import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import type { User } from "../models/user";
import { getUsersApi } from "../API/Users";
import Loading from "../components/Loading";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import '../styles.css';

const Users = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const usersData = await getUsersApi(token || "");
      setUsers(usersData);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "error";
      case "agent":
        return "warning";
      case "customer":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="lg" className="users-container">
      <Typography variant="h4" className="users-title">
        Manage Users
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead className="users-table-head">
            <TableRow>
              <TableCell className="users-table-header">Name</TableCell>
              <TableCell className="users-table-header">Email</TableCell>
              <TableCell className="users-table-header">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" className="users-no-data">
                  <Typography color="textSecondary">No users found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  className="users-row"
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={getRoleColor(user.role)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default Users;