import React, { useState, useEffect } from 'react';
import { Calendar, Users, User, MapPin, Book, Music, PlaneTakeoff, ChevronRight, Plus, List, Search, Filter } from 'lucide-react';
import EventCard from './components/EventCard';
import CreateEventDialog from './components/CreateEventDialog';
import EnrolledEvents from './components/EnrolledEvents';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  Chip,
  Avatar,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { getEvents, getEnrolledEvents } from './services/eventService';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const MetricCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[1],
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const MetricTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Month');
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isEnrolledEventsOpen, setIsEnrolledEventsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEnrolledEvents, setShowEnrolledEvents] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Dummy data for platform metrics
  const metricsData = [
    { title: 'Total Events', value: '1,293', percent: 70, color: 'success.main' },
    { title: 'Active Users', value: '8,471', percent: 60, color: 'info.main' },
    { title: 'Monthly Joins', value: '3,842', percent: 75, color: 'warning.main' },
    { title: 'New Events', value: '421', percent: 40, color: 'error.main' },
    { title: 'Matching Rate', value: '72%', percent: 72, color: 'secondary.main' },
  ];

  // Dummy data for event categories
  const categoryData = [
    { title: 'Study Groups', icon: <Book size={20} />, value: 34 },
    { title: 'Travel & Trips', icon: <PlaneTakeoff size={20} />, value: 27 },
    { title: 'Entertainment', icon: <Music size={20} />, value: 22 },
    { title: 'Projects & Collaboration', icon: <User size={20} />, value: 17 },
  ];

  // Dummy data for event locations
  const locationData = [
    { title: 'New York', icon: <MapPin size={20} />, percent: 32, value: '724' },
    { title: 'San Francisco', icon: <MapPin size={20} />, percent: 26, value: '591' },
    { title: 'Chicago', icon: <MapPin size={20} />, percent: 21, value: '478' },
    { title: 'Austin', icon: <MapPin size={20} />, percent: 14, value: '319' },
  ];

  // Dummy data for events
  const upcomingEventsData = [
    {
      id: 1,
      title: 'React Study Group',
      description: 'Join us for a deep dive into React hooks and state management. All skill levels welcome!',
      organizer: 'Sarah Johnson',
      date: 'Apr 18, 2025',
      time: '6:00 PM',
      location: 'New York',
      category: 'Study Group',
      spots: { total: 12, filled: 8 },
      capacity: 12,
      enrolled: 8,
      applicants: 15,
      status: 'Active',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      title: 'Weekend Hiking Trip',
      description: 'Explore the beautiful trails of Colorado with fellow outdoor enthusiasts. Moderate difficulty.',
      organizer: 'Michael Chen',
      date: 'Apr 20, 2025',
      time: '9:00 AM',
      location: 'Colorado',
      category: 'Travel',
      spots: { total: 8, filled: 6 },
      capacity: 8,
      enrolled: 6,
      applicants: 14,
      status: 'Active',
      imageUrl: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      title: 'Mobile App Project',
      description: 'Collaborate on building a cross-platform mobile app using React Native. Looking for designers and developers.',
      organizer: 'Jamal Wilson',
      date: 'Apr 22, 2025',
      time: '7:00 PM',
      location: 'Virtual',
      category: 'Project',
      spots: { total: 5, filled: 3 },
      capacity: 5,
      enrolled: 3,
      applicants: 11,
      status: 'Active',
      imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 4,
      title: 'Concert Buddies',
      description: 'Looking for people to attend the upcoming music festival. Let\'s enjoy great music together!',
      organizer: 'Emma Rodriguez',
      date: 'Apr 25, 2025',
      time: '5:00 PM',
      location: 'Los Angeles',
      category: 'Entertainment',
      spots: { total: 6, filled: 4 },
      capacity: 6,
      enrolled: 4,
      applicants: 9,
      status: 'Active',
      imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 5,
      title: 'Photography Workshop',
      description: 'Learn advanced photography techniques from a professional photographer. Bring your own camera.',
      organizer: 'Daniel Kim',
      date: 'Apr 29, 2025',
      time: '10:00 AM',
      location: 'Chicago',
      category: 'Learning',
      spots: { total: 20, filled: 12 },
      capacity: 20,
      enrolled: 12,
      applicants: 18,
      status: 'Active',
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
  ];

  // Daily activity data
  const dailyActivityData = [
    { title: 'Monday', newEvents: 34, joins: 78 },
    { title: 'Tuesday', newEvents: 56, joins: 94 },
    { title: 'Wednesday', newEvents: 32, joins: 67 },
    { title: 'Thursday', newEvents: 43, joins: 91 },
    { title: 'Friday', newEvents: 62, joins: 103 },
    { title: 'Saturday', newEvents: 53, joins: 82 },
    { title: 'Sunday', newEvents: 29, joins: 69 },
  ];

  // User demographics
  const userDemographics = [
    { title: 'Male', icon: <User size={20} />, value: 52 },
    { title: 'Female', icon: <User size={20} />, value: 48 },
  ];

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      setEvents(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleEventCreated = (newEvent) => {
    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnrollSuccess = () => {
    fetchEnrolledEvents();
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Event Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Discover and join exciting events in your area
        </Typography>
      </Box>

      {/* Quick Actions */}
      <StyledPaper sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={() => setIsCreateEventOpen(true)}
              sx={{ py: 1.5 }}
            >
              Create New Event
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<List size={20} />}
              onClick={() => setIsEnrolledEventsOpen(true)}
              sx={{ py: 1.5 }}
            >
              My Enrolled Events
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Users size={20} />}
              sx={{ py: 1.5 }}
            >
              Manage Applications
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Calendar size={20} />}
              sx={{ py: 1.5 }}
            >
              My Calendar
            </Button>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Platform Metrics */}
      <StyledPaper sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Platform Metrics</Typography>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            size="small"
            sx={{ 
              '& .MuiTab-root': { 
                minWidth: 'auto',
                px: 2,
                py: 1
              }
            }}
          >
            <Tab label="Day" value="Day" />
            <Tab label="Week" value="Week" />
            <Tab label="Month" value="Month" />
            <Tab label="Year" value="Year" />
          </Tabs>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">April 2025</Typography>
          
          {/* Placeholder for main chart */}
          <Box 
            sx={{ 
              height: 200, 
              bgcolor: 'background.default', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              my: 2, 
              border: 1, 
              borderColor: 'divider', 
              borderRadius: 1
            }}
          >
            <Typography color="text.secondary">Event Growth Chart</Typography>
          </Box>
        </Box>
        
        <Grid container spacing={3}>
          {metricsData.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <MetricCard>
                <CardContent>
                  <MetricTitle>{metric.title}</MetricTitle>
                  <MetricValue>{metric.value}</MetricValue>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ flexGrow: 1, mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={metric.percent} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            backgroundColor: metric.color
                          }
                        }} 
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {metric.percent}%
                    </Typography>
                  </Box>
                </CardContent>
              </MetricCard>
            </Grid>
          ))}
        </Grid>
      </StyledPaper>

      {/* Events and Activity */}
      <Grid container spacing={3}>
        {/* Left Side - Event Analytics */}
        <Grid item xs={12} md={6}>
          <StyledPaper sx={{ height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Event Analytics
            </Typography>
            
            {/* Categories */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Categories
              </Typography>
              <Stack spacing={2}>
                {categoryData.map((item, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ color: 'primary.main', mr: 1 }}>
                          {item.icon}
                        </Box>
                        <Typography variant="body2">{item.title}</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="medium">{item.value}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={item.value} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Top Locations */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Top Locations
              </Typography>
              <Stack spacing={2}>
                {locationData.map((item, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ color: 'primary.main', mr: 1 }}>
                          {item.icon}
                        </Box>
                        <Typography variant="body2">{item.title}</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="medium">
                        {item.value} ({item.percent}%)
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={item.percent} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Daily Activity */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Daily Activity
              </Typography>
              <Stack spacing={2}>
                {dailyActivityData.map((item, index) => (
                  <Box key={index}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.title}
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">New Events</Typography>
                        <Typography variant="body2">{item.newEvents}</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.newEvents} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            backgroundColor: 'warning.main'
                          }
                        }} 
                      />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">User Joins</Typography>
                        <Typography variant="body2">{item.joins}</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.joins} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            backgroundColor: 'info.main'
                          }
                        }} 
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* User Demographics */}
            <Box>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                User Demographics
              </Typography>
              <Grid container spacing={2}>
                {userDemographics.map((item, index) => (
                  <Grid item xs={6} key={index}>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ color: 'primary.main', mr: 1 }}>
                            {item.icon}
                          </Box>
                          <Typography variant="body2">{item.title}</Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="medium">{item.value}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.value} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            backgroundColor: 'secondary.main'
                          }
                        }} 
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </StyledPaper>
        </Grid>

        {/* Right Side - Upcoming Events */}
        <Grid item xs={12} md={6}>
          <StyledPaper sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Upcoming Events</Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<List size={16} />}
                  onClick={() => setIsEnrolledEventsOpen(true)}
                >
                  My Events
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Plus size={16} />}
                  onClick={() => setIsCreateEventOpen(true)}
                >
                  Create Event
                </Button>
              </Stack>
            </Box>

            <Stack spacing={3}>
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} onEnrollSuccess={handleEnrollSuccess} />
              ))}
            </Stack>
          </StyledPaper>

          <StyledPaper>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 3 }}
            >
              <TextField
                placeholder="Search events..."
                value={searchQuery}
                onChange={handleSearch}
                size="small"
                sx={{ flexGrow: 1, maxWidth: { sm: 300 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                size="small"
              >
                Filter
              </Button>
            </Stack>
          </StyledPaper>
        </Grid>
      </Grid>

      {/* Create Event Dialog */}
      <CreateEventDialog 
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        onEventCreated={handleEventCreated}
      />

      {/* Enrolled Events Dialog */}
      <EnrolledEvents 
        open={isEnrolledEventsOpen}
        onClose={() => setIsEnrolledEventsOpen(false)}
        events={enrolledEvents}
      />
    </Container>
  );
};

export default Dashboard;