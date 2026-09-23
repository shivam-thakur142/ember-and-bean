const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

/**
 * Universal JSON fetch helper with detailed error reporting
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.message || `Request failed with status ${response.status}: ${response.statusText}`;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error(`Unable to connect to backend server at ${API_BASE_URL}. Ensure the backend is running.`);
    }
    throw err;
  }
}

// ---------------- MENU SERVICES ----------------
export const getMenu = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'all') query.append('category', params.category);
  if (params.featured) query.append('featured', 'true');
  if (params.search) query.append('search', params.search);

  const qs = query.toString() ? `?${query.toString()}` : '';
  return apiRequest(`/api/menu${qs}`, { method: 'GET' });
};

export const getMenuItem = async (id) => {
  return apiRequest(`/api/menu/${id}`, { method: 'GET' });
};

export const createMenuItem = async (itemData, adminKey) => {
  return apiRequest('/api/menu', {
    method: 'POST',
    headers: { 'x-admin-key': adminKey },
    body: JSON.stringify(itemData),
  });
};

export const updateMenuItem = async (id, itemData, adminKey) => {
  return apiRequest(`/api/menu/${id}`, {
    method: 'PUT',
    headers: { 'x-admin-key': adminKey },
    body: JSON.stringify(itemData),
  });
};

export const deleteMenuItem = async (id, adminKey) => {
  return apiRequest(`/api/menu/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-key': adminKey },
  });
};

// ---------------- RESERVATION SERVICES ----------------
export const createReservation = async (reservationData) => {
  return apiRequest('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(reservationData),
  });
};

export const getReservations = async (status, adminKey) => {
  const qs = status ? `?status=${status}` : '';
  return apiRequest(`/api/reservations${qs}`, {
    method: 'GET',
    headers: { 'x-admin-key': adminKey },
  });
};

export const updateReservation = async (id, data, adminKey) => {
  return apiRequest(`/api/reservations/${id}`, {
    method: 'PUT',
    headers: { 'x-admin-key': adminKey },
    body: JSON.stringify(data),
  });
};

export const deleteReservation = async (id, adminKey) => {
  return apiRequest(`/api/reservations/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-key': adminKey },
  });
};

// ---------------- CONTACT SERVICES ----------------
export const submitContactMessage = async (contactData) => {
  return apiRequest('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
  });
};

export const getContactMessages = async (adminKey) => {
  return apiRequest('/api/contact', {
    method: 'GET',
    headers: { 'x-admin-key': adminKey },
  });
};

// ---------------- ADMIN SERVICES ----------------
export const adminLogin = async (password) => {
  return apiRequest('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
};

export const getAdminStats = async (adminKey) => {
  return apiRequest('/api/admin/stats', {
    method: 'GET',
    headers: { 'x-admin-key': adminKey },
  });
};

// ---------------- HEALTH CHECK ----------------
export const checkApiHealth = async () => {
  return apiRequest('/api/health', { method: 'GET' });
};
