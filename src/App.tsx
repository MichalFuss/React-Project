import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Container, Box, Typography, Snackbar, Alert } from '@mui/material';
import { useAuth } from './context/auth/AuthContext';
import { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const { error, clearError } = useAuth();
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    if (error) {
      setOpenError(true);
    }
  }, [error]);

  const handleCloseError = () => {
    setOpenError(false);
    clearError();
  };

  return (
    <Box className="app-main-box">
      <Header />
      <Box className="app-content">
        <Outlet />
      </Box>
      <Box component="footer" className="app-footer">
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary">
            © 2024 Ticket Management System. All rights reserved.
          </Typography>
        </Container>
      </Box>

      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseError} severity="error" className="snackbar-alert">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
