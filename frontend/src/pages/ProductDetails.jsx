import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Heart,
    ShoppingCart,
    MessageCircle,
    ShieldCheck,
    MapPin,
    GraduationCap,
    Clock,
    Share2,
    AlertTriangle,
    Check,
    ChevronRight,
    Edit3
} from "lucide-react";
import { getProductById } from "../api/products";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { createWhatsAppLink, getProductInquiryMessage } from "../utils/whatsapp";
import ReportModal from "../components/ReportModal";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart, isInCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                setError("");
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Failed to load product:", err);
                setError(err.message || "Product not found or unavailable.");
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#FDFBF0] flex items-center justify-center p-6">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                    <p className="text-sm font-semibold text-slate-500">Loading product details...</p>
                </div>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="min-h-screen bg-[#FDFBF0] flex items-center justify-center p-6">
                <div className="max-w-md text-center rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <AlertTriangle size={30} />
                    </div>
                    <h2 className="mt-4 font-archivo text-2xl font-black text-slate-900">
                        Listing Not Found
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                        {error || "This item may have been removed or is no longer available."}
                    </p>
                    <button
                        onClick={() => navigate("/shop")}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                    >
                        <ArrowLeft size={16} />
                        Back to Shop
                    </button>
                </div>
            </main>
        );
    }

    const images = product.images && product.images.length > 0
        ? product.images.map((img) => (typeof img === "object" ? img.url : img))
        : ["/categories/electronics.PNG"];

    const isOwner = user && (user.id === product.seller?._id || user._id === product.seller?._id);
    const wishlisted = isInWishlist(product._id);
    const inCart = isInCart(product._id);

    const whatsappUrl = createWhatsAppLink(
        product.seller?.whatsappNumber,
        getProductInquiryMessage(product)
    );

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-[#FDFBF0] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <div className="mx-auto max-w-7xl">

                {/* Top Breadcrumbs & Back */}
                <div className="mb-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-emerald-700"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleShare}
                            className="flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
                        >
                            {copied ? <Check size={15} className="text-emerald-600" /> : <Share2 size={15} />}
                            <span>{copied ? "Link Copied!" : "Share"}</span>
                        </button>

                        <button
                            onClick={() => setIsReportOpen(true)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 shadow-sm transition hover:bg-red-50 hover:text-red-500"
                            title="Report listing"
                        >
                            <AlertTriangle size={17} />
                        </button>
                    </div>
                </div>

                {/* Main Product Layout */}
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">

                    {/* LEFT: Image Gallery (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        {/* Main Featured Image */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-center">
                            <img
                                src={images[selectedImageIndex] || images[0]}
                                alt={product.title}
                                className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                            />

                            {/* Status Pill */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${
                                    product.status === "available"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-red-100 text-red-700"
                                }`}>
                                    {product.status === "available" ? "Available" : "Sold"}
                                </span>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                                    {product.condition}
                                </span>
                            </div>

                            {/* Wishlist Floating Button */}
                            <button
                                onClick={() => {
                                    if (wishlisted) {
                                        removeFromWishlist(product._id);
                                    } else {
                                        addToWishlist({
                                            id: product._id,
                                            _id: product._id,
                                            title: product.title,
                                            price: product.price,
                                            condition: product.condition,
                                            category: product.category,
                                            image: images[0],
                                            seller: product.seller
                                        });
                                    }
                                }}
                                className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition ${
                                    wishlisted
                                        ? "border-red-200 bg-red-50 text-red-500"
                                        : "border-slate-200 bg-white/95 text-slate-500 hover:bg-red-50 hover:text-red-500"
                                }`}
                                aria-label="Wishlist"
                            >
                                <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-white p-2 transition ${
                                            selectedImageIndex === idx
                                                ? "border-emerald-600 shadow-md ring-2 ring-emerald-600/20"
                                                : "border-slate-200 hover:border-slate-300"
                                        }`}
                                    >
                                        <img src={img} alt="" className="h-full w-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Product Description Block */}
                        <div className="mt-2 rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                            <h3 className="font-archivo text-xl font-black text-slate-900">
                                Description
                            </h3>
                            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                                {product.description}
                            </p>

                            <div className="mt-6 border-t border-slate-100 pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                                <div>
                                    <span className="text-slate-400">Category</span>
                                    <p className="font-bold text-slate-800 mt-0.5">{product.category}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400">Condition</span>
                                    <p className="font-bold text-slate-800 mt-0.5">{product.condition}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400">Campus</span>
                                    <p className="font-bold text-slate-800 mt-0.5">{product.college}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Product Details & Actions (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">

                        {/* Purchase & Seller Card */}
                        <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                                    {product.category}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-slate-400">
                                    <Clock size={13} />
                                    {new Date(product.createdAt).toLocaleDateString("en-IN", {
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </span>
                            </div>

                            <h1 className="mt-3 font-archivo text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
                                {product.title}
                            </h1>

                            <div className="mt-4 flex items-baseline gap-2">
                                <span className="font-archivo text-3xl sm:text-4xl font-black text-slate-950">
                                    ₹{Number(product.price).toLocaleString("en-IN")}
                                </span>
                                <span className="text-xs font-semibold text-emerald-600">Fixed Campus Price</span>
                            </div>

                            {/* Owner controls if user is seller */}
                            {isOwner ? (
                                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                                    <p className="text-xs font-bold text-amber-900">
                                        This is your product listing
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                        <button
                                            onClick={() => navigate(`/edit-product/${product._id}`)}
                                            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-950 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-600"
                                        >
                                            <Edit3 size={14} />
                                            Edit Listing
                                        </button>
                                        <button
                                            onClick={() => navigate("/profile")}
                                            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                                        >
                                            Manage
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* Buyer CTA Buttons */
                                <div className="mt-7 flex flex-col gap-3">
                                    {/* Primary WhatsApp Action */}
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-13 w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] text-sm font-black text-white shadow-lg shadow-[#25D366]/20 transition hover:bg-[#20bd5a] hover:scale-[1.01]"
                                    >
                                        <MessageCircle size={20} className="fill-current" />
                                        Chat with Seller on WhatsApp
                                    </a>

                                    <div className="grid grid-cols-2 gap-2.5">
                                        <button
                                            onClick={() => {
                                                addToCart({
                                                    id: product._id,
                                                    _id: product._id,
                                                    title: product.title,
                                                    price: product.price,
                                                    condition: product.condition,
                                                    category: product.category,
                                                    image: images[0],
                                                    seller: product.seller
                                                });
                                            }}
                                            className={`flex h-12 items-center justify-center gap-2 rounded-2xl border text-xs font-bold transition ${
                                                inCart
                                                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                                                    : "border-slate-200 bg-slate-900 text-white hover:bg-emerald-700"
                                            }`}
                                        >
                                            <ShoppingCart size={16} />
                                            {inCart ? "In Your Cart" : "Add to Cart"}
                                        </button>

                                        <button
                                            onClick={() => {
                                                if (wishlisted) {
                                                    removeFromWishlist(product._id);
                                                } else {
                                                    addToWishlist({
                                                        id: product._id,
                                                        _id: product._id,
                                                        title: product.title,
                                                        price: product.price,
                                                        condition: product.condition,
                                                        category: product.category,
                                                        image: images[0],
                                                        seller: product.seller
                                                    });
                                                }
                                            }}
                                            className={`flex h-12 items-center justify-center gap-2 rounded-2xl border text-xs font-bold transition ${
                                                wishlisted
                                                    ? "border-red-200 bg-red-50 text-red-500"
                                                    : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                                            }`}
                                        >
                                            <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
                                            {wishlisted ? "Saved" : "Save Item"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Seller Information Card */}
                            <div className="mt-8 border-t border-slate-100 pt-6">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Seller Details
                                </p>

                                <div className="mt-3 flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-900 text-lg font-black text-white">
                                        {product.seller?.firstName?.charAt(0)?.toUpperCase() || "S"}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1.5">
                                            <h4 className="truncate text-base font-bold text-slate-900">
                                                {product.seller?.firstName
                                                    ? `${product.seller.firstName} ${product.seller.lastName || ""}`.trim()
                                                    : "Campus Student"}
                                            </h4>
                                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
                                                <Check size={10} strokeWidth={3} />
                                            </span>
                                        </div>

                                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
                                            {product.seller?.branch && (
                                                <span className="flex items-center gap-1">
                                                    <GraduationCap size={13} />
                                                    {product.seller.branch} • Year {product.seller.year}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                            <MapPin size={12} />
                                            <span>{product.college || "Manipal University Jaipur"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Safety & Meetup Guide */}
                        <div className="rounded-[28px] border border-emerald-100 bg-[#E8F7E9]/70 p-6">
                            <div className="flex gap-3.5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-emerald-950">
                                        Campus Safety Guidelines
                                    </h4>
                                    <ul className="mt-2 space-y-1.5 text-xs text-emerald-900/80 leading-relaxed">
                                        <li>• Meet inside campus areas (food court, library, blocks).</li>
                                        <li>• Inspect the product carefully before transferring funds.</li>
                                        <li>• Direct UPI or cash payment directly upon item handover.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* Report Modal */}
            <ReportModal
                productId={product._id}
                productTitle={product.title}
                isOpen={isReportOpen}
                onClose={() => setIsReportOpen(false)}
            />
        </main>
    );
}
