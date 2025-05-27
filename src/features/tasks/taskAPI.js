import api from '../../services/api';

// Helper to get token and set Authorization header
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchTasksAPI = () =>
  api.get('/tasks', { headers: getAuthHeaders() });

export const createTaskAPI = (task) =>
  api.post('/tasks', task, { headers: getAuthHeaders() });

export const updateTaskAPI = (task) =>
  api.put(`/tasks/${task.id}`, task, { headers: getAuthHeaders() });

export const deleteTaskAPI = (id) =>
  api.delete(`/tasks/${id}`, { headers: getAuthHeaders() });
