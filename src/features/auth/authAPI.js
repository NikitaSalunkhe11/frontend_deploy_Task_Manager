import api from '../../services/api';

export const loginAPI = (credentials) => api.post('/auth/login', credentials);
export const registerAPI = (userData) => api.post('/auth/register', userData);

