import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ArrowLeft,
    Check,
    AlertCircle,
    Loader2,
    ImagePlus,
    X,
    Save,
    Trash2
} from "lucide-react";
import { getProductById, updateProduct, deleteProduct } from "../api/products";
import { useAuth } from "../context/AuthContext";

const categories = [
    "Electronics",
    "Books",
    "Textbooks",
    "Furniture",
    "Clothing",
    "Stationery",
    "Sports",
    "Other",
];

const conditions = ["New", "Like New", "Good", "Fair"];

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuth();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        condition: "",
        price: "",
        status: "available",
        description: "",
    });

    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        async function fetchProduct() {
            try {
                setLoading(true);
                const data = await getProductById(id);

                // Verify ownership
                const sellerId = data.seller?._id || data.seller;
                const currentUserId = user?.id || user?._id;

                if (sellerId && currentUserId && sellerId.toString() !== currentUserId.toString()) {
                    navigate("/shop");
                    return;
                }

                setFormData({
                    title: data.title || "",
                    category: data.category || "Electronics",
                    condition: data.condition || "Good",
                    price: data.price || "",
                    status: data.status || "available",
                    description: data.description || "",
                });

                setExistingImages(
                    data.images?.map((img) => (typeof img === "object" ? img.url : img)) || []
                );
            } catch (err) {
                setError(err.message || "Failed to load product details.");
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id, isLoggedIn, user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNewFiles = (e) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        const slotsLeft = 5 - (existingImages.length + newImages.length);
        const toAdd = files.slice(0, Math.max(0, slotsLeft)).map((file) => ({
            id: `${file.name}-${Math.random()}`,
            file,
            url: URL.createObjectURL(file)
        }));
        setNewImages((prev) => [...prev, ...toAdd]);
        e.target.value = "";
    };

    const removeNewImage = (imgId) => {
        setNewImages((prev) => {
            const item = prev.find((i) => i.id === imgId);
            if (item) URL.revokeObjectURL(item.url);
            return prev.filter((i) => i.id !== imgId);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        setSuccessMessage("");

        try {
            const data = new FormData();
            data.append("title", formData.title.trim());
            data.append("description", formData.description.trim());
            data.append("price", formData.price);
            data.append("category", formData.category);
            data.append("condition", formData.condition);
            data.append("status", formData.status);

            newImages.forEach((img) => {
                if (img.file) data.append("images", img.file);
            });

            await updateProduct(id, data);
            setSuccessMessage("Listing updated successfully!");
            setTimeout(() => {
                navigate(`/product/${id}`);
            }, 1000);
        } catch (err) {
            setError(err.message || "Failed to update listing.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to permanently delete this listing? This action cannot be undone.")) {
            return;
        }

        setSubmitting(true);
        try {
            await deleteProduct(id);
            navigate("/profile");
        } catch (err) {
            setError(err.message || "Failed to delete listing.");
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#FDFBF0] flex items-center justify-center p-6">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                    <p className="text-sm font-semibold text-slate-500">Loading listing details...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#FDFBF0] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">

                <div className="mb-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-emerald-700"
                    >
                        <ArrowLeft size={16} />
                        Back to Product
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={submitting}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-3.5 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
                    >
                        <Trash2 size={15} />
                        Delete Listing
                    </button>
                </div>

                <div className="rounded-[28px] border border-[#EBE6CE] bg-[#FFFDF2] p-6 sm:p-8 lg:p-10 shadow-sm">
                    <div className="mb-8">
                        <h1 className="font-archivo text-3xl font-black text-slate-950">
                            Edit Listing
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Update your product price, details, or availability status.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                            <AlertCircle size={18} className="shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-6 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                            <Check size={18} className="shrink-0" />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            />
                        </div>

                        {/* Price & Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    min="0"
                                    required
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Availability Status *
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                >
                                    <option value="available">Available</option>
                                    <option value="sold">Sold</option>
                                </select>
                            </div>
                        </div>

                        {/* Category & Condition */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                >
                                    {categories.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Condition *
                                </label>
                                <select
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                >
                                    {conditions.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                rows={5}
                                name="description"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 resize-none"
                            />
                        </div>

                        {/* Existing Images Preview */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                Photos ({existingImages.length + newImages.length} / 5)
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {existingImages.map((url, idx) => (
                                    <div key={idx} className="relative h-24 w-24 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
                                        <img src={url} alt="" className="h-full w-full object-contain" />
                                    </div>
                                ))}

                                {newImages.map((img) => (
                                    <div key={img.id} className="relative h-24 w-24 overflow-hidden rounded-2xl border border-emerald-300 bg-emerald-50 p-2">
                                        <img src={img.url} alt="" className="h-full w-full object-contain" />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(img.id)}
                                            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white shadow"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}

                                {existingImages.length + newImages.length < 5 && (
                                    <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition">
                                        <ImagePlus size={22} />
                                        <span className="mt-1 text-[11px] font-semibold">Add Photo</span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleNewFiles}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Submit CTA */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="h-12 rounded-xl border border-slate-300 px-6 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-8 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:opacity-50"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </main>
    );
}
