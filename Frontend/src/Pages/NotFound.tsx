import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../CSS/NotFound.css'

const NotFound: React.FC = () => 
{
    return (
        <Box className="not-found-container">
            <Typography variant="h4" gutterBottom className="not-found-subtitle">
                Oops! Page Not Found
            </Typography>
            <Typography variant="body1" className="not-found-text">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
            <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                className="not-found-button"
            >
                Go Back
            </Button>
        </Box>
    );
};

export default NotFound;