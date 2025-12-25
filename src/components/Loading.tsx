import { Box, CircularProgress, Typography } from "@mui/material";
import '../styles.css';

const Loading: React.FC = () => {
  return (
    <Box className="loading-container">
      <CircularProgress />
      <Typography variant="body1" color="textSecondary">
        Loading...
      </Typography>
    </Box>
  );
};
export default Loading;