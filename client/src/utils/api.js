import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('portfolio_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getPortfolio = () => API.get('/portfolio');
export const getProfile = () => API.get('/profile');
export const updateProfile = (data) => API.put('/profile', data);
export const uploadPhoto = (formData) => API.post('/profile/photo', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const getExperience = () => API.get('/experience');
export const createExperience = (data) => API.post('/experience', data);
export const updateExperience = (id, data) => API.put(`/experience/${id}`, data);
export const deleteExperience = (id) => API.delete(`/experience/${id}`);

export const getProjects = () => API.get('/projects');
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const getSkills = () => API.get('/skills');
export const createSkill = (data) => API.post('/skills', data);
export const updateSkill = (id, data) => API.put(`/skills/${id}`, data);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

export const getEducation = () => API.get('/education');
export const createEducation = (data) => API.post('/education', data);
export const updateEducation = (id, data) => API.put(`/education/${id}`, data);
export const deleteEducation = (id) => API.delete(`/education/${id}`);

export const getCertifications = () => API.get('/certifications');
export const createCertification = (data) => API.post('/certifications', data);
export const deleteCertification = (id) => API.delete(`/certifications/${id}`);

export const getMessages = () => API.get('/messages');
export const sendMessage = (data) => API.post('/contact', data);
export const markRead = (id) => API.put(`/messages/${id}/read`);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);

export const login = (email, password) => API.post('/auth/login', { email, password });
export const changePassword = (data) => API.put('/auth/password', data);

export default API;
