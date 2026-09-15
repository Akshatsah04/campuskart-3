const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export async function apiClient(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

    const headers = {
        ...(options.headers || {})
    };

    // Inject token if available
    const token = localStorage.getItem("token");
    if (token && !headers.Authorization) {
        headers.Authorization = `Bearer ${token}`;
    }

    // Do NOT set Content-Type if body is FormData (let browser set boundary)
    if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    const config = {
        ...options,
        headers
    };

    const response = await fetch(url, config);

    // Handle unauthorized (expired token)
    if (response.status === 401) {
        // If current route is not login/signup and token exists, notify session expired
        if (token && !window.location.pathname.includes("login") && !window.location.pathname.includes("signup")) {
            console.warn("Session expired. Please log in again.");
        }
    }

    let data;
    try {
        data = await response.json();
    } catch {
        data = { message: "An unexpected server response occurred." };
    }

    if (!response.ok) {
        const error = new Error(data.message || `Request failed with status ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
}

export default apiClient;
