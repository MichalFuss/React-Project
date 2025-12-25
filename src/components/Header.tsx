import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Container,
  Divider,
} from "@mui/material";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import '../styles.css';

const Header = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <AppBar position="static" className="header-appbar">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              textDecoration: "none",
              color: "inherit",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            🎫 Ticket System
          </Typography>

          <Box className="header-nav-links">
            {user ? (
              <>
                <Button color="inherit" component={RouterLink} to="/dashboard">
                  Dashboard
                </Button>
                <Button color="inherit" component={RouterLink} to="/ticket">
                  Tickets
                </Button>
                {user?.role === "customer" && (
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/ticket/new"
                  >
                    New Ticket
                  </Button>
                )}
                {user?.role === "admin" && (
                  <>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/status"
                    >
                      Statuses
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/users">
                      Users
                    </Button>
                  </>
                )}

                <Divider
                  orientation="vertical"
                  flexItem
                  className="header-divider"
                />

                <Button
                  color="inherit"
                  onClick={handleMenuOpen}
                  startIcon={<PersonIcon />}
                  sx={{
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Hello, {user.name}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem disabled>
                    <Typography variant="body2">
                      {user.email}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon className="logout-icon" />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/login">
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                  variant="outlined"
                  className="header-logout-btn"
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;