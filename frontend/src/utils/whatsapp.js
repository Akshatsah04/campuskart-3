/**
 * Formats an Indian or international phone number for WhatsApp deep link.
 * Ensures country code is prepended if not present.
 */
export function formatWhatsAppNumber(phone) {
    if (!phone) return "";
    // Remove non-digit characters
    let cleaned = String(phone).replace(/\D/g, "");

    // If 10 digits (standard Indian number without prefix), prepend 91
    if (cleaned.length === 10) {
        cleaned = `91${cleaned}`;
    } else if (cleaned.length === 11 && cleaned.startsWith("0")) {
        // e.g. 09876543210 -> 919876543210
        cleaned = `91${cleaned.substring(1)}`;
    }

    return cleaned;
}

/**
 * Creates a WhatsApp chat link with an optional pre-filled greeting message.
 */
export function createWhatsAppLink(phone, message = "") {
    const formattedPhone = formatWhatsAppNumber(phone);
    if (!formattedPhone) return "#";

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

/**
 * Generates an inquiry message for a product listing.
 */
export function getProductInquiryMessage(product) {
    const title = product?.title || product?.name || "this item";
    const price = product?.price ? `₹${Number(product.price).toLocaleString("en-IN")}` : "";
    const sellerName = product?.seller?.name ? product.seller.name.split(" ")[0] : "there";

    return `Hey ${sellerName}! I saw your listing for "${title}" ${price ? `(${price})` : ""} on CampusKart. Is it still available?`;
}
