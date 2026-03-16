const API_URL = import.meta.env.VITE_API_URL || '/api';
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:5000';

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('adminToken');
    const headers = {
        ...options.headers,
        'Authorization': token ? `Bearer ${token}` : '',
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
    }

    return response;
};

export const api = {
    get: (endpoint: string) => fetch(`${API_URL}${endpoint}`).then(res => res.json()),
    post: (endpoint: string, data: any) => fetchWithAuth(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(res => res.json()),

    // For multipart form data (images)
    postFormData: (endpoint: string, formData: FormData) => fetchWithAuth(endpoint, {
        method: 'POST',
        body: formData,
    }).then(res => res.json()),

    putFormData: (endpoint: string, formData: FormData) => fetchWithAuth(endpoint, {
        method: 'PUT',
        body: formData,
    }).then(res => res.json()),

    delete: (endpoint: string) => fetchWithAuth(endpoint, {
        method: 'DELETE',
    }).then(res => res.json()),
};
