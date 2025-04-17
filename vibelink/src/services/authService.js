import api from '../api/axios';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    
    // Store user information
    if (response.data.user) {
      localStorage.setItem('userName', response.data.user.name);
      if (response.data.user.profileImage) {
        localStorage.setItem('userProfileImage', response.data.user.profileImage);
      }
    }
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    
    // Store user information
    if (response.data.user) {
      localStorage.setItem('userName', response.data.user.name);
      if (response.data.user.profileImage) {
        localStorage.setItem('userProfileImage', response.data.user.profileImage);
      }
    }
  }
  return response.data;
};

export const logout = async () => {
  try {
    await api.get('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear all auth-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userProfileImage');
  }
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await api.put('/users/profile', userData);
  
  // Update stored user information if successful
  if (response.data.data && response.data.data.name) {
    localStorage.setItem('userName', response.data.data.name);
  }
  
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await api.put('/users/changepassword', passwordData);
  return response.data;
}; 