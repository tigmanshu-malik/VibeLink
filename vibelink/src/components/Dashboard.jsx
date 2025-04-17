import React, { useState } from 'react';
import EventCard from './EventCard';
import CreateEventDialog from './CreateEventDialog';
import EnrolledEvents from './EnrolledEvents';
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
  Tab
} from '@mui/material';
import { 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  Users, 
  User, 
  MapPin, 
  Book, 
  Music, 
  PlaneTakeoff, 
  ChevronRight, 
  List,
  BarChart,
  PieChart,
  TrendingUp
} from 'lucide-react';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
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
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isEnrolledEventsOpen, setIsEnrolledEventsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Day');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Sample events data - replace with actual data from your backend
  const events = [
    {
      id: 1,
      title: 'Summer Music Festival',
      description: 'A three-day music festival featuring local and international artists.',
      date: '2024-07-15',
      time: '14:00',
      location: 'Central Park',
      capacity: 1000,
      enrolled: 750,
      category: 'Music',
      imageUrl: 'https://source.unsplash.com/random/800x600/?concert'
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      description: 'Annual technology conference with industry leaders and innovators.',
      date: '2024-08-20',
      time: '09:00',
      location: 'Convention Center',
      capacity: 500,
      enrolled: 300,
      category: 'Technology',
      imageUrl: 'https://source.unsplash.com/random/800x600/?technology'
    },
    // Add more sample events as needed
  ];

  // Platform metrics data
  const metricsData = [
    { title: 'Total Events', value: '1,293', percent: 70, color: 'success.main' },
    { title: 'Active Users', value: '8,471', percent: 60, color: 'info.main' },
    { title: 'Monthly Joins', value: '3,842', percent: 75, color: 'warning.main' },
    { title: 'New Events', value: '421', percent: 40, color: 'error.main' },
    { title: 'Matching Rate', value: '72%', percent: 72, color: 'secondary.main' },
  ];

  // Event categories data
  const categoryData = [
    { title: 'Study Groups', icon: <Book size={20} />, value: 34 },
    { title: 'Travel & Trips', icon: <PlaneTakeoff size={20} />, value: 27 },
    { title: 'Entertainment', icon: <Music size={20} />, value: 22 },
    { title: 'Projects & Collaboration', icon: <User size={20} />, value: 17 },
  ];

  // Event locations data
  const locationData = [
    { title: 'New York', icon: <MapPin size={20} />, percent: 32, value: '724' },
    { title: 'San Francisco', icon: <MapPin size={20} />, percent: 26, value: '591' },
    { title: 'Chicago', icon: <MapPin size={20} />, percent: 21, value: '478' },
    { title: 'Austin', icon: <MapPin size={20} />, percent: 14, value: '319' },
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

  // User demographics data
  const userDemographics = [
    { title: 'Male', icon: <User size={20} />, value: 52 },
    { title: 'Female', icon: <User size={20} />, value: 48 },
  ];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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

      {/* Event Analytics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <StyledPaper sx={{ height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Event Categories
            </Typography>
            <Grid container spacing={2}>
              {categoryData.map((category, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, color: 'primary.main' }}>
                      {category.icon}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{category.title}</Typography>
                        <Typography variant="body2" fontWeight="medium">{category.value}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={category.value} 
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
                  </Box>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StyledPaper sx={{ height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Top Locations
            </Typography>
            <Grid container spacing={2}>
              {locationData.map((location, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, color: 'primary.main' }}>
                      {location.icon}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{location.title}</Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {location.value} ({location.percent}%)
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={location.percent} 
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
                  </Box>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>

      {/* Daily Activity */}
      <StyledPaper sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Daily Activity
        </Typography>
        <Grid container spacing={2}>
          {dailyActivityData.map((day, index) => (
            <Grid item xs={12} sm={6} md={3.4} key={index}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    {day.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary">New Events</Typography>
                      <Typography variant="body2">{day.newEvents}</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={day.newEvents} 
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
                      <Typography variant="body2">{day.joins}</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={day.joins} 
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </StyledPaper>

      {/* User Demographics */}
      <StyledPaper sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          User Demographics
        </Typography>
        <Grid container spacing={3}>
          {userDemographics.map((demo, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, color: 'primary.main' }}>
                      {demo.icon}
                    </Box>
                    <Typography variant="subtitle1">{demo.title}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1, mr: 2 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={demo.value} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            backgroundColor: 'secondary.main'
                          }
                        }} 
                      />
                    </Box>
                    <Typography variant="h6">{demo.value}%</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </StyledPaper>

      {/* Events List */}
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
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ flexGrow: 1, maxWidth: { sm: 300 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Filter size={20} />}
              size="small"
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              startIcon={<Calendar size={20} />}
              onClick={() => setIsEnrolledEventsOpen(true)}
              size="small"
            >
              My Events
            </Button>
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={() => setIsCreateEventOpen(true)}
              size="small"
            >
              Create Event
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} lg={4} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      </StyledPaper>

      <CreateEventDialog
        open={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
      />

      <EnrolledEvents
        open={isEnrolledEventsOpen}
        onClose={() => setIsEnrolledEventsOpen(false)}
        enrolledEvents={events.filter(event => event.enrolled > 0)}
      />
    </Container>
  );
};

export default Dashboard;