const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

async function request(path, { method = 'GET', token, body, isForm = false } = {}) {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (!isForm) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const err = await res.json();
      message = err.message || err.error || message;
    } catch (_) {
      // ignore
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  login: (payload) => request('/api/auth/login', { method: 'POST', body: payload }),
  register: (payload) => request('/api/auth/register', { method: 'POST', body: payload }),

  getApprovedCars: (token) => request('/api/cars/approved', { token }),
  getCarById: (id, token) => request(`/api/cars/${id}`, { token }),
  calculateEmi: (payload, token) => request('/api/cars/emi/calculate', { method: 'POST', token, body: payload }),

  createCar: (payload, token) => request('/api/cars/dealer', { method: 'POST', token, body: payload }),
  getDealerCars: (token) => request('/api/cars/dealer/me', { token }),
  uploadCarImage: (carId, file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    return request(`/api/uploads/cars/${carId}/image`, {
      method: 'POST',
      token,
      body: formData,
      isForm: true
    });
  },

  getPendingCars: (token) => request('/api/cars/admin/pending', { token }),
  updateCarStatus: (carId, status, token) => request(`/api/cars/admin/${carId}/status?status=${status}`, {
    method: 'PATCH',
    token
  })
};

export { API_BASE };