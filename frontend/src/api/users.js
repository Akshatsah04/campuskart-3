import { apiClient } from "./client.js";

/**
 * Update current user profile
 */
export async function updateProfile(userData) {
    const response = await apiClient("/users/me", {
        method: "PATCH",
        body: JSON.stringify(userData)
    });
    return response;
}

/**
 * Get public profile of a user/seller
 */
export async function getUserPublicProfile(userId) {
    const response = await apiClient(`/users/${userId}`);
    return response;
}
