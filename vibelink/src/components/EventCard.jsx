import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  LocationOn,
  Person,
  Group,
  Close as CloseIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { enrollInEvent } from '../services/eventService';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const CategoryChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
}));

const EventCard = ({ event, onEnrollSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleEnroll = async () => {
    try {
      setLoading(true);
      setError(null);
      await enrollInEvent(event._id);
      onEnrollSuccess();
      setShowDetails(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll in event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <StyledCard>
        <Box sx={{ position: 'relative' }}>
          <StyledCardMedia
            image={event.image || 'https://source.unsplash.com/random/800x600/?event'}
            title={event.title}
          />
          <CategoryChip label={event.category} />
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {event.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">
              {formatDate(event.date)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTime sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">
              {event.time}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">
              {event.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                src={event.organizer?.profileImage}
                alt={event.organizer?.name}
                sx={{ width: 24, height: 24, mr: 1 }}
              >
                <Person />
              </Avatar>
              <Typography variant="body2" color="text.secondary">
                {event.organizer?.name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Group sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                {event.enrolledUsers?.length || 0}/{event.capacity}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setShowDetails(true)}
          >
            View Details
          </Button>
        </CardContent>
      </StyledCard>

      <Dialog
        open={showDetails}
        onClose={() => setShowDetails(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{event.title}</Typography>
            <IconButton onClick={() => setShowDetails(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <img
              src={event.image || 'https://source.unsplash.com/random/800x600/?event'}
              alt={event.title}
              style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }}
            />
          </Box>
          <Typography variant="body1" paragraph>
            {event.description}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                {formatDate(event.date)} at {event.time}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">{event.location}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Group sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                {event.enrolledUsers?.length || 0} of {event.capacity} spots filled
              </Typography>
            </Box>
          </Box>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDetails(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleEnroll}
            disabled={loading || (event.enrolledUsers?.length || 0) >= event.capacity}
          >
            {loading ? <CircularProgress size={24} /> : 'Enroll Now'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventCard; 