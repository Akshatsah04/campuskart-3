import { apiClient } from "./client.js";

/**
 * Fetch all products with query filters, search, and pagination
 */
export async function getProducts(params = {}) {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "" && value !== "All") {
            query.append(key, value);
        }
    });

    const queryString = query.toString() ? `?${query.toString()}` : "";
    const response = await apiClient(`/products${queryString}`);
    return response;
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id) {
    const response = await apiClient(`/products/${id}`);
    return response.product;
}

/**
 * Fetch current user's products
 */
export async function getMyProducts() {
    const response = await apiClient("/products/me");
    return response;
}

/**
 * Create a new product listing (multipart FormData)
 */
export async function createProduct(formData) {
    const response = await apiClient("/products", {
        method: "POST",
        body: formData
    });
    return response;
}

/**
 * Update a product listing
 */
export async function updateProduct(id, formDataOrData) {
    const isFormData = formDataOrData instanceof FormData;
    const response = await apiClient(`/products/${id}`, {
        method: "PATCH",
        body: isFormData ? formDataOrData : JSON.stringify(formDataOrData)
    });
    return response;
}

/**
 * Update product availability status
 */
export async function updateProductStatus(id, status) {
    const response = await apiClient(`/products/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status })
    });
    return response;
}

/**
 * Delete a product
 */
export async function deleteProduct(id) {
    const response = await apiClient(`/products/${id}`, {
        method: "DELETE"
    });
    return response;
}