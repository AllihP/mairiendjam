import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// CSRF token injection for POST/PUT/DELETE
api.interceptors.request.use(cfg => {
  const csrfToken = document.cookie.split('; ')
    .find(r => r.startsWith('csrftoken='))?.split('=')[1];
  if (csrfToken && ['post','put','patch','delete'].includes(cfg.method)) {
    cfg.headers['X-CSRFToken'] = csrfToken;
  }
  return cfg;
});

export const endpoints = {
  arrondissements: () => api.get('/arrondissements/'),
  arrondissement:  (n) => api.get(`/arrondissements/${n}/`),
  services:        () => api.get('/services/'),
  service:         (slug) => api.get(`/services/${slug}/`),
  news:            (params) => api.get('/news/', { params }),
  newsItem:        (id) => api.get(`/news/${id}/`),
  agenda:          () => api.get('/agenda/'),
  tickers:         () => api.get('/tickers/'),
  administration:  () => api.get('/administration/'),
  adminUnit:       (slug) => api.get(`/administration/${slug}/`),
  stats:           () => api.get('/stats/'),
  sendContact:     (data) => api.post('/contact/send/', data),
};

export default api;
