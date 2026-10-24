const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// ================================
// LOGIN
// ================================
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

// ================================
// START SIGNUP
// Sends OTP to college email
// ================================
export async function startSignup(userData) {
  const response = await fetch(`${API_URL}/auth/signup/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to start signup");
  }

  return data;
}

// ================================
// VERIFY SIGNUP OTP
// Creates account after OTP verification
// ================================
export async function verifySignup(data) {
  const response = await fetch(`${API_URL}/auth/signup/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "OTP verification failed");
  }

  return responseData;
}

// ================================
// CURRENT USER
// ================================
export async function getCurrentUser(token) {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get current user");
  }

  return data;
}