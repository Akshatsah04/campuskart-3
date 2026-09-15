import { apiClient } from "./client.js";

/**
 * Submit a report for a product listing
 */
export async function submitReport(reportData) {
    const response = await apiClient("/reports", {
        method: "POST",
        body: JSON.stringify(reportData)
    });
    return response;
}
