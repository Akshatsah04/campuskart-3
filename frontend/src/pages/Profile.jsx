import React, { useState } from "react";
import {
    Camera,
    Check,
    ChevronRight,
    Eye,
    Heart,
    LogOut,
    MapPin,
    Pencil,
    Plus,
    Settings,
    ShieldCheck,
    Star,
    Tag,
    Trash2,
    BriefcaseBusiness,
    Clock3,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const listings = [
    {
        id: 1,
        title: "Engineering Mathematics Book",
        price: 350,
        status: "Active",
        views: 45,
        time: "2 days ago",
        image: "/categories/textbooks.PNG",
    },
    {
        id: 2,
        title: "MacBook Air M1",
        price: 55000,
        status: "Active",
        views: 120,
        time: "5 days ago",
        image: "/categories/electronics.PNG",
    },
    {
        id: 3,
        title: "Study Chair",
        price: 3000,
        status: "Sold",
        views: 210,
        time: "1 week ago",
        image: "/categories/furniture.PNG",
    },
    {
        id: 4,
        title: "Mechanical Keyboard",
        price: 2499,
        status: "Active",
        views: 78,
        time: "1 week ago",
        image: "/categories/electronics.PNG",
    },
    {
        id: 5,
        title: "iPhone 13 (128GB)",
        price: 32000,
        status: "Active",
        views: 96,
        time: "2 weeks ago",
        image: "/categories/electronics.PNG",
    },
    {
        id: 6,
        title: "Study Lamp",
        price: 699,
        status: "Active",
        views: 34,
        time: "2 weeks ago",
        image: "/categories/furniture.PNG",
    },
    {
        id: 7,
        title: "College Backpack",
        price: 1200,
        status: "Sold",
        views: 88,
        time: "3 weeks ago",
        image: "/categories/others.PNG",
    },
    {
        id: 8,
        title: "Sports Shoes",
        price: 4500,
        status: "Active",
        views: 67,
        time: "3 weeks ago",
        image: "/categories/clothing.PNG",
    },
];

const savedItems = [
    {
        id: 1,
        title: "Gaming Laptop",
        price: 48000,
        image: "/categories/electronics.PNG",
    },
    {
        id: 2,
        title: "Study Table",
        price: 2500,
        image: "/categories/furniture.PNG",
    },
    {
        id: 3,
        title: "Engineering Books",
        price: 700,
        image: "/categories/textbooks.PNG",
    },
];

const reviews = [
    {
        id: 1,
        name: "Rahul",
        rating: 5,
        text: "Very smooth transaction. Item was exactly as described.",
        time: "2 weeks ago",
    },
    {
        id: 2,
        name: "Aditya",
        rating: 5,
        text: "Friendly seller and quick communication.",
        time: "1 month ago",
    },
    {
        id: 3,
        name: "Karan",
        rating: 4,
        text: "Good experience overall.",
        time: "2 months ago",
    },
];

export default function Profile() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("listings");
    const [activeListingFilter, setActiveListingFilter] = useState("All");
    const [showEditProfile, setShowEditProfile] = useState(false);

    const activeListings = listings.filter(
        (item) => item.status === "Active"
    );

    const soldListings = listings.filter(
        (item) => item.status === "Sold"
    );

    const filteredListings =
        activeListingFilter === "All"
            ? listings
            : activeListingFilter === "Active"
                ? activeListings
                : soldListings;

    const formatPrice = (price) => {
        return `₹${price.toLocaleString("en-IN")}`;
    };

    return (
        <main className="min-h-screen bg-[#FDFBF0] px-3 py-5 sm:px-5 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-7xl">

                {/* =========================================
            PROFILE HEADER
        ========================================== */}

                <section className="overflow-hidden rounded-[28px] border border-[#EBE6CE] bg-[#FFFDF2] shadow-sm">

                    {/* ================= TOP PROFILE AREA ================= */}
                    <div className="relative overflow-hidden">

                        {/* Soft green background on right */}
                        <div className="absolute inset-y-0 right-0 hidden w-[43%] bg-[#f4f6ec] lg:block" />

                        <div className="relative z-10 grid lg:grid-cols-[1fr_43%]">

                            {/* LEFT — PROFILE INFO */}
                            <div className="px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-8">

                                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

                                    {/* Avatar */}
                                    <div className="relative shrink-0 self-center sm:self-start">

                                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#162033] text-5xl font-black text-white shadow-lg sm:h-36 sm:w-36">
                                            A
                                        </div>

                                        {/* Camera */}
                                        <button
                                            onClick={() => setShowEditProfile(true)}
                                            className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-white text-slate-700 shadow-md transition hover:bg-emerald-50 hover:text-emerald-600"
                                            aria-label="Change profile photo"
                                        >
                                            <Camera size={17} />
                                        </button>

                                    </div>

                                    {/* Profile Details */}
                                    <div className="min-w-0 flex-1">

                                        {/* Name */}
                                        <div className="flex flex-wrap items-center gap-2">

                                            <h1 className="font-archivo text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                                Akshat Sah
                                            </h1>

                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                                                <Check size={15} strokeWidth={3} />
                                            </span>

                                        </div>

                                        {/* College */}
                                        <p className="mt-2 text-base font-medium text-slate-800">
                                            Manipal University Jaipur
                                        </p>

                                        {/* Branch + Year */}
                                        <p className="mt-1 text-sm text-slate-500">
                                            Computer Science Engineering
                                            <span className="mx-2">•</span>
                                            2nd Year
                                        </p>

                                        {/* Location */}
                                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                                            <MapPin size={16} />
                                            <span>Jaipur, Rajasthan</span>
                                        </div>

                                        {/* Bio */}
                                        <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
                                            Student, developer and always looking for good deals.
                                        </p>

                                        {/* Verification + Joined */}
                                        <div className="mt-4 flex flex-wrap items-center gap-3">

                                            {/* Verified */}
                                            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                                                <ShieldCheck size={15} />
                                                College Verified
                                            </div>

                                            {/* Joined */}
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                                <Clock3 size={15} />
                                                Joined Aug 2024
                                            </div>

                                        </div>

                                    </div>

                                    {/* Edit Profile */}
                                    <button
                                        onClick={() => setShowEditProfile(true)}
                                        className="flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        <Pencil size={15} />
                                        Edit Profile
                                    </button>

                                </div>

                            </div>

                            {/* RIGHT — CAMPUS ILLUSTRATION */}
                            <div className="relative hidden items-center justify-center overflow-hidden lg:flex">
                                <img
                                    src="/illustrations/campus-profile.png"
                                    alt="Manipal University Jaipur campus"
                                    className="h-auto w-full object-contain"
                                />
                            </div>

                        </div>
                    </div>

                    {/* ================= STATS ROW ================= */}
                    <div className="grid grid-cols-1 gap-3 border-t border-slate-100 bg-white p-4 sm:grid-cols-3 sm:p-5">

                        {/* Active Listings */}
                        <div className="rounded-2xl bg-slate-50 px-5 py-4">
                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                    <BriefcaseBusiness size={22} />
                                </div>

                                <div>
                                    <p className="text-2xl font-black leading-none text-slate-950">
                                        {activeListings.length}
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-slate-800">
                                        Active Listings
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-400">
                                        Items you're selling
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Items Sold */}
                        <div className="rounded-2xl bg-slate-50 px-5 py-4">
                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                    <Tag size={22} />
                                </div>

                                <div>
                                    <p className="text-2xl font-black leading-none text-slate-950">
                                        {soldListings.length}
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-slate-800">
                                        Items Sold
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-400">
                                        Successfully sold
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Rating */}
                        <div className="rounded-2xl bg-slate-50 px-5 py-4">
                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                    <Star size={22} fill="currentColor" />
                                </div>

                                <div>
                                    <p className="text-2xl font-black leading-none text-slate-950">
                                        4.8
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-slate-800">
                                        Rating
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-400">
                                        From fellow students
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>

                </section>

                {/* =========================================
            MAIN DASHBOARD
        ========================================== */}

                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">

                    {/* =======================================
              LEFT
          ======================================== */}

                    <div className="min-w-0">

                        {/* Tabs */}
                        <div className="overflow-x-auto border-b border-slate-200">

                            <div className="flex min-w-max items-center gap-1">

                                <ProfileTab
                                    active={activeTab === "listings"}
                                    icon={<BriefcaseBusiness size={18} />}
                                    label="My Listings"
                                    onClick={() => setActiveTab("listings")}
                                />

                                <ProfileTab
                                    active={activeTab === "saved"}
                                    icon={<Heart size={18} />}
                                    label="Saved Items"
                                    onClick={() => setActiveTab("saved")}
                                />

                                <ProfileTab
                                    active={activeTab === "reviews"}
                                    icon={<Star size={18} />}
                                    label="Reviews"
                                    onClick={() => setActiveTab("reviews")}
                                />

                                <ProfileTab
                                    active={activeTab === "settings"}
                                    icon={<Settings size={18} />}
                                    label="Settings"
                                    onClick={() => setActiveTab("settings")}
                                />

                            </div>

                        </div>

                        {/* =====================================
                LISTINGS
            ====================================== */}

                        {activeTab === "listings" && (
                            <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                    <div>
                                        <h2 className="font-archivo text-2xl font-black text-slate-950">
                                            My Listings
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Manage your listed items.
                                        </p>
                                    </div>

                                    <Link
                                        to="/sell"
                                        className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-600"
                                    >
                                        <Plus size={17} />
                                        Sell a New Item
                                    </Link>

                                </div>

                                {/* Filters */}
                                <div className="mt-6 flex gap-2 overflow-x-auto pb-1">

                                    {["All", "Active", "Sold"].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveListingFilter(filter)}
                                            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${activeListingFilter === filter
                                                    ? "bg-emerald-600 text-white"
                                                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                                }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}

                                </div>

                                {/* Product grid */}
                                {filteredListings.length > 0 ? (
                                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                                        {filteredListings.map((item) => (
                                            <ProfileProductCard
                                                key={item.id}
                                                item={item}
                                                formatPrice={formatPrice}
                                            />
                                        ))}

                                    </div>
                                ) : (
                                    <EmptyState
                                        title="No listings found"
                                        description="You don't have any items in this section yet."
                                        action={
                                            <Link
                                                to="/sell"
                                                className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600"
                                            >
                                                Sell an Item
                                            </Link>
                                        }
                                    />
                                )}

                            </section>
                        )}

                        {/* =====================================
                SAVED
            ====================================== */}

                        {activeTab === "saved" && (
                            <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                                <div>
                                    <h2 className="font-archivo text-2xl font-black text-slate-950">
                                        Saved Items
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Items you've saved for later.
                                    </p>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

                                    {savedItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                                        >

                                            <div className="relative aspect-square bg-slate-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-full w-full object-contain p-5"
                                                />

                                                <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow-sm">
                                                    <Heart size={15} fill="currentColor" />
                                                </button>
                                            </div>

                                            <div className="p-4">
                                                <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-2 text-lg font-black text-emerald-600">
                                                    {formatPrice(item.price)}
                                                </p>
                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </section>
                        )}

                        {/* =====================================
                REVIEWS
            ====================================== */}

                        {activeTab === "reviews" && (
                            <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                                    <div className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl bg-emerald-50">

                                        <p className="text-4xl font-black text-slate-950">
                                            4.8
                                        </p>

                                        <div className="mt-1 flex text-emerald-500">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={14}
                                                    fill="currentColor"
                                                />
                                            ))}
                                        </div>

                                        <p className="mt-1 text-[11px] text-slate-500">
                                            24 reviews
                                        </p>

                                    </div>

                                    <div>
                                        <h2 className="font-archivo text-2xl font-black text-slate-950">
                                            Reviews
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            See what other students say about you.
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-7 divide-y divide-slate-100">

                                    {reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="py-5 first:pt-0 last:pb-0"
                                        >

                                            <div className="flex items-start justify-between gap-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                                                        {review.name.charAt(0)}
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">
                                                            {review.name}
                                                        </p>

                                                        <div className="mt-1 flex items-center gap-1 text-emerald-500">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <Star
                                                                    key={star}
                                                                    size={12}
                                                                    fill={
                                                                        star <= review.rating
                                                                            ? "currentColor"
                                                                            : "none"
                                                                    }
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>

                                                </div>

                                                <span className="text-xs text-slate-400">
                                                    {review.time}
                                                </span>

                                            </div>

                                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                                "{review.text}"
                                            </p>

                                        </div>
                                    ))}

                                </div>

                            </section>
                        )}

                        {/* =====================================
                SETTINGS
            ====================================== */}

                        {activeTab === "settings" && (
                            <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                                <h2 className="font-archivo text-2xl font-black text-slate-950">
                                    Account Settings
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Manage your account and preferences.
                                </p>

                                <div className="mt-6 divide-y divide-slate-100">

                                    <SettingsRow
                                        title="Personal Information"
                                        description="Name, email and profile details"
                                    />

                                    <SettingsRow
                                        title="College & Verification"
                                        description="Manage your college verification"
                                    />

                                    <SettingsRow
                                        title="Notifications"
                                        description="Choose what notifications you receive"
                                    />

                                    <SettingsRow
                                        title="Privacy & Security"
                                        description="Password and account security"
                                    />

                                    <SettingsRow
                                        title="Help & Support"
                                        description="Get help with your account"
                                    />

                                    <button
                                        onClick={() => console.log("Logout")}
                                        className="flex w-full items-center justify-between py-5 text-left"
                                    >
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                                <LogOut size={18} />
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-red-500">
                                                    Logout
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-400">
                                                    Sign out of your account
                                                </p>
                                            </div>

                                        </div>

                                        <ChevronRight
                                            size={18}
                                            className="text-slate-300"
                                        />
                                    </button>

                                </div>

                            </section>
                        )}

                    </div>

                    {/* =======================================
              RIGHT SIDEBAR
          ======================================== */}

                    <aside className="space-y-5">

                        {/* Verification */}
                        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="rounded-2xl bg-emerald-50 p-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                        <ShieldCheck size={23} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-black text-emerald-800">
                                            Verified Student
                                        </p>

                                        <p className="mt-0.5 text-xs text-emerald-700/70">
                                            Your college is verified
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="mt-5 space-y-3">

                                <VerificationItem text="College email verified" />
                                <VerificationItem text="Manipal University Jaipur" />
                                <VerificationItem text="Active student" />

                            </div>

                            <p className="mt-5 text-xs leading-5 text-slate-500">
                                Verified students help build a safer campus community.
                            </p>

                        </div>

                        {/* Profile completion */}
                        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">

                            <h3 className="text-lg font-black text-slate-950">
                                Profile Completion
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Complete your profile to get more responses.
                            </p>

                            <div className="mt-4 flex items-center gap-3">

                                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full w-[80%] rounded-full bg-emerald-600" />
                                </div>

                                <span className="text-xs font-bold text-slate-700">
                                    80%
                                </span>

                            </div>

                            <div className="mt-5 space-y-3">

                                <CompletionItem done text="Add profile photo" />
                                <CompletionItem done text="Add college details" />
                                <CompletionItem done text="Write a short bio" />
                                <CompletionItem text="Add social links (optional)" />

                            </div>

                        </div>

                        {/* Recent activity */}
                        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="flex items-center justify-between">

                                <h3 className="text-lg font-black text-slate-950">
                                    Recent Activity
                                </h3>

                                <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                                    View all
                                </button>

                            </div>

                            <div className="mt-5 space-y-4">

                                <ActivityItem
                                    icon={<BriefcaseBusiness size={16} />}
                                    text='Your item "Study Chair" was marked as sold'
                                    time="2 days ago"
                                />

                                <ActivityItem
                                    icon={<Heart size={16} />}
                                    text="You saved a new item"
                                    time="3 days ago"
                                />

                                <ActivityItem
                                    icon={<Star size={16} />}
                                    text="You received a new review"
                                    time="1 week ago"
                                />

                                <ActivityItem
                                    icon={<Pencil size={16} />}
                                    text="You updated your profile"
                                    time="2 weeks ago"
                                />

                            </div>

                        </div>

                        {/* Account settings shortcut */}
                        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">

                            <h3 className="text-lg font-black text-slate-950">
                                Account Settings
                            </h3>

                            <div className="mt-3 divide-y divide-slate-100">

                                <SidebarSetting text="Personal Information" />
                                <SidebarSetting text="College & Verification" />
                                <SidebarSetting text="Notifications" />
                                <SidebarSetting text="Privacy & Security" />
                                <SidebarSetting text="Help & Support" />

                            </div>

                            <button
                                onClick={() => console.log("Logout")}
                                className="mt-3 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>

                        </div>

                    </aside>

                </div>

                {/* =========================================
            BOTTOM BANNER
        ========================================== */}

                <section className="relative mt-6 overflow-hidden rounded-[28px] bg-[#E8F7E9] px-6 py-7 sm:px-8">

                    <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600">
                                <Tag size={22} />
                            </div>

                            <div>
                                <h3 className="text-lg font-black text-emerald-900">
                                    Buy. Sell. Connect.
                                </h3>

                                <p className="mt-1 text-sm text-emerald-800/70">
                                    Turn your unused items into opportunities for fellow students.
                                </p>
                            </div>

                        </div>

                        <Link
                            to="/sell"
                            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
                        >
                            Sell Something
                            <ArrowIcon />
                        </Link>

                    </div>

                </section>

            </div>

            {/* =========================================
          EDIT PROFILE MODAL
      ========================================== */}

            {showEditProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">

                    <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">

                        <div className="flex items-center justify-between">

                            <div>
                                <h2 className="font-archivo text-2xl font-black text-slate-950">
                                    Edit Profile
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Update your profile information.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowEditProfile(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                            >
                                ×
                            </button>

                        </div>

                        <div className="mt-7 space-y-4">

                            <div>
                                <label className="text-sm font-bold text-slate-900">
                                    Full Name
                                </label>

                                <input
                                    defaultValue="Akshat Sah"
                                    className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-900">
                                    College
                                </label>

                                <input
                                    defaultValue="Manipal University Jaipur"
                                    className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label className="text-sm font-bold text-slate-900">
                                        Branch
                                    </label>

                                    <input
                                        defaultValue="Computer Science Engineering"
                                        className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-slate-900">
                                        Year
                                    </label>

                                    <select
                                        defaultValue="2"
                                        className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    >
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                    </select>
                                </div>

                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-900">
                                    Bio
                                </label>

                                <textarea
                                    defaultValue="Student, developer and always looking for good deals."
                                    rows={3}
                                    className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                        </div>

                        <div className="mt-7 flex justify-end gap-3">

                            <button
                                onClick={() => setShowEditProfile(false)}
                                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => setShowEditProfile(false)}
                                className="rounded-xl bg-slate-950 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-600"
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </main>
    );
}


/* =========================================================
   COMPONENTS
========================================================= */

function StatCard({ icon, value, label, description }) {
    return (
        <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">

            <div className="flex items-center gap-3">

                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 sm:flex">
                    {icon}
                </div>

                <div className="min-w-0">

                    <p className="text-xl font-black text-slate-950 sm:text-2xl">
                        {value}
                    </p>

                    <p className="truncate text-xs font-bold text-slate-700 sm:text-sm">
                        {label}
                    </p>

                    <p className="hidden text-[11px] text-slate-400 sm:block">
                        {description}
                    </p>

                </div>

            </div>

        </div>
    );
}


function ProfileTab({ active, icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`relative flex items-center gap-2 px-4 py-4 text-sm font-semibold transition ${active
                    ? "text-emerald-600"
                    : "text-slate-500 hover:text-slate-900"
                }`}
        >
            {icon}
            {label}

            {active && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-emerald-600" />
            )}
        </button>
    );
}


function ProfileProductCard({ item, formatPrice }) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">

            <div className="relative aspect-square overflow-hidden bg-slate-100">

                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
                />

                <button
                    type="button"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-500 shadow-sm hover:text-slate-900"
                >
                    <Pencil size={14} />
                </button>

            </div>

            <div className="p-3.5">

                <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-slate-900">
                    {item.title}
                </h3>

                <div className="mt-2 flex items-center justify-between gap-2">

                    <p className="text-base font-black text-emerald-600">
                        {formatPrice(item.price)}
                    </p>

                    <span
                        className={`rounded-full px-2 py-1 text-[10px] font-bold ${item.status === "Active"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                    >
                        {item.status}
                    </span>

                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">

                    <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {item.views} views
                    </span>

                    <span>
                        {item.time}
                    </span>

                </div>

            </div>

        </div>
    );
}


function VerificationItem({ text }) {
    return (
        <div className="flex items-center gap-2.5">

            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check size={12} strokeWidth={3} />
            </div>

            <span className="text-xs font-medium text-slate-600">
                {text}
            </span>

        </div>
    );
}


function CompletionItem({ done = false, text }) {
    return (
        <div className="flex items-center gap-2.5">

            <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${done
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
            >
                {done && <Check size={12} strokeWidth={3} />}
            </div>

            <span
                className={`text-xs ${done
                        ? "font-medium text-slate-600"
                        : "text-slate-400"
                    }`}
            >
                {text}
            </span>

        </div>
    );
}


function ActivityItem({ icon, text, time }) {
    return (
        <div className="flex gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs font-medium leading-5 text-slate-700">
                    {text}
                </p>

                <p className="mt-0.5 text-[10px] text-slate-400">
                    {time}
                </p>
            </div>

        </div>
    );
}


function SidebarSetting({ text }) {
    return (
        <button className="flex w-full items-center justify-between py-3 text-left text-xs font-medium text-slate-600 hover:text-slate-950">

            <span>{text}</span>

            <ChevronRight
                size={15}
                className="text-slate-300"
            />

        </button>
    );
}


function SettingsRow({ title, description }) {
    return (
        <button className="flex w-full items-center justify-between gap-4 py-5 text-left">

            <div>
                <p className="text-sm font-bold text-slate-900">
                    {title}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    {description}
                </p>
            </div>

            <ChevronRight
                size={18}
                className="shrink-0 text-slate-300"
            />

        </button>
    );
}


function EmptyState({ title, description, action }) {
    return (
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Tag size={23} />
            </div>

            <h3 className="mt-4 text-lg font-black text-slate-900">
                {title}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
                {description}
            </p>

            <div className="mt-5">
                {action}
            </div>

        </div>
    );
}


function ArrowIcon() {
    return <ArrowRightIcon />;
}


function ArrowRightIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}