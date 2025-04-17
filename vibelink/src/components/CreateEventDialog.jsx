import React, { useState } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  Typography,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { createEvent } from '../services/eventService';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius * 2,
    maxWidth: 600,
    width: '100%',
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
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const CreateEventDialog = ({ isOpen, onClose, onEventCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    category: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Format the date and time
      const eventDateTime = new Date(`${formData.date}T${formData.time}`);
      
      const eventData = {
        ...formData,
        capacity: parseInt(formData.capacity),
        date: eventDateTime.toISOString(),
        image: formData.image || 'no-photo.jpg'
      };

      const response = await createEvent(eventData);
      onEventCreated(response.data);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        capacity: '',
        category: '',
        image: ''
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Sports',
    'Music',
    'Art',
    'Technology',
    'Food',
    'Other'
  ];

  return (
    <StyledDialog 
      open={isOpen} 
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <StyledDialogTitle>
        <Typography variant="h5" component="div" fontWeight="bold">
          Create New Event
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
      
      <form onSubmit={handleSubmit}>
        <StyledDialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="Enter event title"
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={3}
                variant="outlined"
                placeholder="Enter event description"
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="Enter event location"
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  label="Category"
                  disabled={loading}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="Enter maximum capacity"
                InputProps={{
                  inputProps: { min: 1 }
                }}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Image URL (Optional)"
                name="image"
                value={formData.image}
                onChange={handleChange}
                variant="outlined"
                placeholder="Enter image URL"
                disabled={loading}
              />
            </Grid>
          </Grid>
        </StyledDialogContent>
        
        <Divider />
        
        <StyledDialogActions>
          <Button 
            onClick={onClose} 
            variant="outlined"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Create Event'}
          </Button>
        </StyledDialogActions>
      </form>
    </StyledDialog>
  );
};

export default CreateEventDialog; 