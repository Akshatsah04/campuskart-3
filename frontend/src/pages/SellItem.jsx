import React, { useMemo, useRef, useState } from "react";
import {
    ArrowRight,
    Check,
    ChevronDown,
    ImagePlus,
    MapPin,
    ShieldCheck,
    Sparkles,
    Upload,
    User,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
    "Electronics",
    "Books",
    "Furniture",
    "Clothing",
    "Stationery",
    "Sports",
    "Other",
];

const conditions = [
    "New",
    "Like New",
    "Good",
    "Fair",
];

export default function SellItem() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [images, setImages] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        condition: "",
        price: "",
        college: "Manipal University Jaipur",
        description: "",
    });

    const [dragActive, setDragActive] = useState(false);

    // --------------------------------
    // FORM
    // --------------------------------

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // --------------------------------
    // IMAGE UPLOAD
    // --------------------------------

    const addImages = (files) => {
        const selectedFiles = Array.from(files);

        const remainingSlots = 5 - images.length;

        const filesToAdd = selectedFiles.slice(0, remainingSlots);

        const newImages = filesToAdd.map((file) => ({
            id: `${file.name}-${file.lastModified}-${Math.random()}`,
            file,
            url: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...newImages]);
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            addImages(e.target.files);
        }

        e.target.value = "";
    };

    const removeImage = (id) => {
        setImages((prev) => {
            const imageToRemove = prev.find((image) => image.id === id);

            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.url);
            }

            return prev.filter((image) => image.id !== id);
        });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);

        if (e.dataTransfer.files) {
            addImages(e.dataTransfer.files);
        }
    };

    // --------------------------------
    // VALIDATION
    // --------------------------------

    const isFormValid = useMemo(() => {
        return (
            images.length > 0 &&
            formData.title.trim() &&
            formData.category &&
            formData.condition &&
            formData.price &&
            formData.description.trim()
        );
    }, [images, formData]);

    // --------------------------------
    // SUBMIT
    // --------------------------------

    const handleReview = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            return;
        }

        console.log("Listing:", {
            ...formData,
            images,
        });

        // Backend connection will be added here.
        alert("Review step coming next!");
    };

    return (
        <main className="min-h-screen bg-[#FDFBF0]">

            {/* =========================================
          PAGE HEADER
      ========================================== */}

            <section className="relative overflow-hidden px-4 pb-8 pt-10 sm:px-6 lg:px-8 lg:pt-14">

                {/* Decorative background */}
                <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
                <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-emerald-100/30 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

                        {/* Heading */}
                        <div>
                            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-emerald-600">
                                <Sparkles size={16} />
                                <span>Student marketplace</span>
                            </div>

                            <h1 className="font-archivo text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Sell an Item
                            </h1>

                            <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">
                                Turn your unused stuff into cash.
                                <br className="hidden sm:block" />
                                Help someone else on campus.
                            </p>
                        </div>

                        {/* Progress */}
                        <div className="w-full max-w-xl lg:pb-2">

                            <div className="flex items-start">

                                {/* Step 1 */}
                                <div className="flex min-w-0 flex-1 flex-col items-center">
                                    <div className="flex items-center w-full">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-lg shadow-emerald-600/20">
                                            1
                                        </div>

                                        <div className="h-px flex-1 bg-emerald-600" />

                                    </div>

                                    <div className="mt-2 text-center">
                                        <p className="text-sm font-bold text-slate-900">
                                            Details
                                        </p>

                                        <p className="hidden text-xs text-slate-400 sm:block">
                                            Add item information
                                        </p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex min-w-0 flex-1 flex-col items-center">
                                    <div className="flex items-center w-full">

                                        <div className="h-px flex-1 bg-slate-300" />

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                                            2
                                        </div>

                                        <div className="h-px flex-1 bg-slate-300" />

                                    </div>

                                    <div className="mt-2 text-center">
                                        <p className="text-sm font-bold text-slate-700">
                                            Review
                                        </p>

                                        <p className="hidden text-xs text-slate-400 sm:block">
                                            Check your listing
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex min-w-0 flex-1 flex-col items-center">
                                    <div className="flex items-center w-full">

                                        <div className="h-px flex-1 bg-slate-300" />

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                                            3
                                        </div>

                                    </div>

                                    <div className="mt-2 text-center">
                                        <p className="text-sm font-bold text-slate-700">
                                            Publish
                                        </p>

                                        <p className="hidden text-xs text-slate-400 sm:block">
                                            Go live
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =========================================
          MAIN CONTENT
      ========================================== */}

            <section className="px-4 pb-16 sm:px-6 lg:px-8">

                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(350px,0.8fr)]">

                    {/* =====================================
              LEFT FORM
          ====================================== */}

                    <form
                        onSubmit={handleReview}
                        className="rounded-[28px] border border-[#EBE6CE] bg-[#FFFDF2] p-5 shadow-sm sm:p-7 lg:p-8"
                    >

                        <div className="mb-7">
                            <h2 className="font-archivo text-2xl font-black text-slate-950">
                                Item Details
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Fill in the details below to create your listing.
                            </p>
                        </div>

                        {/* =================================
                PHOTOS
            ================================== */}

                        <div>

                            <div className="mb-3 flex items-end justify-between">
                                <div>
                                    <label className="text-sm font-bold text-slate-900">
                                        Photos{" "}
                                        <span className="text-emerald-600">*</span>
                                    </label>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Add up to 5 photos. The first photo will be your cover image.
                                    </p>
                                </div>

                                <span className="text-xs font-medium text-slate-400">
                                    {images.length} / 5
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">

                                {/* Upload button */}
                                {images.length < 5 && (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            setDragActive(true);
                                        }}
                                        onDragLeave={() => setDragActive(false)}
                                        onDrop={handleDrop}
                                        className={`group relative flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${dragActive
                                                ? "border-emerald-500 bg-emerald-50"
                                                : "border-emerald-400 bg-emerald-50/30 hover:border-emerald-500 hover:bg-emerald-50"
                                            }`}
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm transition-transform group-hover:scale-110">
                                            <ImagePlus size={21} />
                                        </div>

                                        <span className="mt-2 text-xs font-bold text-emerald-700">
                                            Add Photos
                                        </span>

                                        <span className="mt-1 text-[10px] text-slate-400">
                                            Click or drag
                                        </span>
                                    </button>
                                )}

                                {/* Uploaded images */}
                                {images.map((image, index) => (
                                    <div
                                        key={image.id}
                                        className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                                    >
                                        <img
                                            src={image.url}
                                            alt={`Product ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />

                                        {/* Cover badge */}
                                        {index === 0 && (
                                            <div className="absolute bottom-2 left-2 rounded-full bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                                                Cover
                                            </div>
                                        )}

                                        {/* Remove */}
                                        <button
                                            type="button"
                                            onClick={() => removeImage(image.id)}
                                            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-700 opacity-0 shadow-sm transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}

                                {/* Empty slots */}
                                {Array.from({
                                    length: Math.max(
                                        0,
                                        5 - images.length - (images.length < 5 ? 1 : 0)
                                    ),
                                }).map((_, index) => (
                                    <div
                                        key={`empty-${index}`}
                                        className="hidden aspect-square rounded-2xl border border-dashed border-slate-200 bg-slate-50 sm:block"
                                    >
                                        <div className="flex h-full items-center justify-center">
                                            <Upload
                                                size={18}
                                                className="text-slate-300"
                                            />
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            {/* Tip */}
                            <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
                                <Sparkles size={15} className="shrink-0" />
                                <span>
                                    <strong>Tip:</strong> Clear, well-lit photos get more attention and sell faster.
                                </span>
                            </div>

                        </div>

                        {/* =================================
                TITLE
            ================================== */}

                        <div className="mt-7">

                            <label
                                htmlFor="title"
                                className="text-sm font-bold text-slate-900"
                            >
                                Title{" "}
                                <span className="text-emerald-600">*</span>
                            </label>

                            <input
                                id="title"
                                name="title"
                                type="text"
                                maxLength={100}
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Engineering Mathematics Book, iPhone 13, Study Table"
                                className="mt-2 h-13 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            />

                            <div className="mt-1 flex justify-end text-[11px] text-slate-400">
                                {formData.title.length} / 100
                            </div>

                        </div>

                        {/* =================================
                CATEGORY + CONDITION
            ================================== */}

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">

                            {/* Category */}
                            <div>

                                <label
                                    htmlFor="category"
                                    className="text-sm font-bold text-slate-900"
                                >
                                    Category{" "}
                                    <span className="text-emerald-600">*</span>
                                </label>

                                <div className="relative mt-2">

                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="h-13 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    >
                                        <option value="">
                                            Select a category
                                        </option>

                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>

                                    <ChevronDown
                                        size={17}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                </div>

                            </div>

                            {/* Condition */}
                            <div>

                                <label
                                    htmlFor="condition"
                                    className="text-sm font-bold text-slate-900"
                                >
                                    Condition{" "}
                                    <span className="text-emerald-600">*</span>
                                </label>

                                <div className="relative mt-2">

                                    <select
                                        id="condition"
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleChange}
                                        className="h-13 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    >
                                        <option value="">
                                            Select condition
                                        </option>

                                        {conditions.map((condition) => (
                                            <option key={condition} value={condition}>
                                                {condition}
                                            </option>
                                        ))}
                                    </select>

                                    <ChevronDown
                                        size={17}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* =================================
                PRICE + COLLEGE
            ================================== */}

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">

                            {/* Price */}
                            <div>

                                <label
                                    htmlFor="price"
                                    className="text-sm font-bold text-slate-900"
                                >
                                    Price{" "}
                                    <span className="text-emerald-600">*</span>
                                </label>

                                <div className="mt-2 flex h-13 overflow-hidden rounded-xl border border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">

                                    <div className="flex w-12 shrink-0 items-center justify-center bg-slate-100 text-sm font-bold text-slate-600">
                                        ₹
                                    </div>

                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="Enter price"
                                        className="min-w-0 flex-1 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                                    />

                                </div>

                            </div>

                            {/* College */}
                            <div>

                                <label
                                    htmlFor="college"
                                    className="text-sm font-bold text-slate-900"
                                >
                                    Your College
                                </label>

                                <div className="relative mt-2">

                                    <MapPin
                                        size={17}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="college"
                                        name="college"
                                        type="text"
                                        value={formData.college}
                                        onChange={handleChange}
                                        className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-600 outline-none"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* =================================
                DESCRIPTION
            ================================== */}

                        <div className="mt-5">

                            <div className="flex items-center justify-between">

                                <label
                                    htmlFor="description"
                                    className="text-sm font-bold text-slate-900"
                                >
                                    Description{" "}
                                    <span className="text-emerald-600">*</span>
                                </label>

                                <span className="text-[11px] text-slate-400">
                                    {formData.description.length} / 500
                                </span>

                            </div>

                            <textarea
                                id="description"
                                name="description"
                                maxLength={500}
                                rows={5}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Tell buyers about your item. Mention its condition, features, reason for selling, etc."
                                className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            />

                        </div>

                        {/* =================================
                ACTIONS
            ================================== */}

                        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

                            <button
                                type="button"
                                onClick={() => navigate("/shop")}
                                className="h-12 rounded-xl border border-slate-300 px-6 text-sm font-bold text-slate-600 transition hover:border-slate-400 hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-7 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                            >
                                Next: Review Listing
                                <ArrowRight size={17} />
                            </button>

                        </div>

                    </form>

                    {/* =====================================
              RIGHT — LIVE PREVIEW
          ====================================== */}

                    <aside className="lg:sticky lg:top-24 lg:self-start">

                        <div className="rounded-[28px] border border-[#EBE6CE] bg-[#FFFDF2] p-5 shadow-sm sm:p-6">

                            <div className="mb-5">
                                <h2 className="font-archivo text-2xl font-black text-slate-950">
                                    Preview
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    This is how your listing will appear to others.
                                </p>
                            </div>

                            {/* Product card */}
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">

                                    {images.length > 0 ? (
                                        <img
                                            src={images[0].url}
                                            alt="Listing preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full flex-col items-center justify-center text-center">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm">
                                                <ImagePlus size={24} />
                                            </div>

                                            <p className="mt-3 max-w-[150px] text-xs font-medium leading-5 text-slate-400">
                                                Your item photo will appear here
                                            </p>
                                        </div>
                                    )}

                                    {/* Wishlist */}
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm"
                                    >
                                        ♡
                                    </button>

                                </div>

                                {/* Details */}
                                <div className="p-5">

                                    <div className="flex items-center justify-between gap-2">

                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                                            {formData.category || "Category"}
                                        </span>

                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
                                            {formData.condition || "Condition"}
                                        </span>

                                    </div>

                                    <h3 className="mt-4 line-clamp-2 min-h-[52px] text-lg font-bold leading-6 text-slate-950">
                                        {formData.title || "Your item title will appear here"}
                                    </h3>

                                    <p className="mt-2 text-2xl font-black text-emerald-600">
                                        ₹{formData.price || "0"}
                                    </p>

                                    <p className="mt-3 line-clamp-3 min-h-[60px] text-sm leading-5 text-slate-500">
                                        {formData.description ||
                                            "Your item description will appear here. Be clear and detailed to attract more buyers."}
                                    </p>

                                    <div className="my-5 h-px bg-slate-100" />

                                    {/* Seller */}
                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                            <User size={18} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-900">
                                                Your Name
                                            </p>

                                            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                                                <MapPin size={12} />
                                                <span className="truncate">
                                                    {formData.college}
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            {/* Trust card */}
                            <div className="mt-5 rounded-2xl bg-emerald-50 p-4">

                                <div className="flex gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600">
                                        <ShieldCheck size={21} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-emerald-800">
                                            Safe & Secure
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-emerald-700/80">
                                            Our campus community keeps buying and selling safe.
                                            Be honest and stay safe!
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </aside>

                </div>
            </section>
        </main>
    );
}