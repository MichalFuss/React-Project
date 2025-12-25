import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { useAuth } from "../context/auth/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import '../styles.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { Register, loading, user, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading && !error) {
      navigate("/dashboard");
    }
  }, [user, loading, error, navigate]);

  const validateForm = (name: string, email: string, pwd: string, confirmPwd: string) => {
    const errors: string[] = [];

    if (name.trim().length < 2) {
      errors.push("Name must be at least 2 characters");
    }

    if (pwd.length < 6) {
      errors.push("Password must be at least 6 characters");
    }

    if (pwd !== confirmPwd) {
      errors.push("Passwords do not match");
    }

    if (!email.includes("@")) {
      errors.push("Please enter a valid email");
    }

    return errors;
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(name, email, password, confirmPassword);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    await Register({ name, email, password });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="sm">
      <Box className="register-container">
        <Paper elevation={3} className="register-paper">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            className="register-title"
          >
            Register
          </Typography>

          {validationErrors.length > 0 && (
            <Box className="register-error-box">
              {validationErrors.map((error, index) => (
                <Typography 
                  key={index} 
                  variant="body2" 
                  color="error" 
                  className={index < validationErrors.length - 1 ? "register-error-text" : ""}
                >
                  • {error}
                </Typography>
              ))}
            </Box>
          )}

          <form onSubmit={sendData}>
            <TextField
              fullWidth
              label="Name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.currentTarget.value);
                setValidationErrors([]);
              }}
              variant="outlined"
              margin="normal"
              required
              helperText="Minimum 2 characters"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
                setValidationErrors([]);
              }}
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
                setValidationErrors([]);
              }}
              variant="outlined"
              margin="normal"
              required
              helperText="Minimum 6 characters"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.currentTarget.value);
                setValidationErrors([]);
              }}
              variant="outlined"
              margin="normal"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="register-submit-btn"
            >
              Register
            </Button>
          </form>

          <Box className="register-login-link">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
export default Register;