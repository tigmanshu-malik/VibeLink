import React from 'react';
import { X } from 'lucide-react';
import EventCard from './EventCard';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius * 2,
    maxWidth: 1000,
    width: '100%',
    maxHeight: '90vh',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  overflowY: 'auto',
}));

const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  textAlign: 'center',
}));

const EnrolledEvents = ({ open, onClose, events = [] }) => {
  if (!Array.isArray(events)) {
    console.error('EnrolledEvents: events prop must be an array');
    return null;
  }

  return (
    <StyledDialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="lg"
    >
      <StyledDialogTitle>
        <Typography variant="h5" component="div" fontWeight="bold">
          My Enrolled Events
        </Typography>
        <IconButton 
          edge="end" 
          color="inherit" 
          onClick={onClose} 
          aria-label="close"
        >
          <X size={24} />
        </IconButton>
      </StyledDialogTitle>
      
      <StyledDialogContent>
        {events.length === 0 ? (
          <EmptyState>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              You haven't enrolled in any events yet
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Browse available events and join the ones that interest you.
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={onClose}
              sx={{ mt: 2 }}
            >
              Browse Events
            </Button>
          </EmptyState>
        ) : (
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} md={6} key={event._id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        )}
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default EnrolledEvents; 