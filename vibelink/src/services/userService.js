import api from '../api/axios';

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

export const changeUserPassword = async (passwordData) => {
  const response = await api.put('/users/changepassword', passwordData);
  return response.data;
}; 