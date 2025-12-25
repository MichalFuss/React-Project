import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Link,
} from "@mui/material";
import type { LoginProps } from "../models/user";
import { useAuth } from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect } from "react";
import '../styles.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const { Login, loading, user, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading && !error) {
      navigate("/dashboard");
    }
  }, [user, loading, error, navigate]);

  const validatePassword = (pwd: string) => {
    if (pwd.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const pwdError = validatePassword(password);
    if (pwdError) {
      setValidationError(pwdError);
      return;
    }

    setValidationError("");
    const data: LoginProps = {
      email,
      password,
    };
    try {
      await Login(data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="sm">
      <Box className="login-container">
        <Paper elevation={3} className="login-paper">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            className="login-title"
          >
            Login
          </Typography>

          {validationError && (
            <Box className="login-error-box">
              <Typography variant="body2" color="error">
                {validationError}
              </Typography>
            </Box>
          )}

          <form onSubmit={sendData}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
                setValidationError("");
              }}
              variant="outlined"
              margin="normal"
              required
              helperText="Minimum 6 characters"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-submit-btn"
            >
              Login
            </Button>
          </form>

          <Box className="login-signup-link">
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/register" underline="hover">
                Register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
export default Login;