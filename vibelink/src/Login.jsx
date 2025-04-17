import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { login } from './services/authService'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}))

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="xs">
      <Grid container spacing={4}>
        <Grid item xs={120} md={70}>
          <StyledPaper>
            <Typography variant="h4" component="h1" gutterBottom>
              Login
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Sign in to your account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Login'
                  )}
                </Button>

                <Button
                  component={Link}
                  to="/forgot-password"
                  color="primary"
                >
                  Forgot password?
                </Button>
              </Box>
            </form>
          </StyledPaper>
        </Grid>

        {/* <Grid item xs={12} md={5}>
          <StyledPaper sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Sign up
              </Typography>
              <Typography variant="body1" paragraph>
                Don't have an account yet? Create one to start connecting with events and people in your area.
              </Typography>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mt: 2 }}
              >
                Register Now!
              </Button>
            </Box>
          </StyledPaper>
        </Grid> */}
      </Grid>
    </Container>
  )
}

export default Login
