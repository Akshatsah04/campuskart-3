import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { getMyProducts, updateProductStatus, deleteProduct } from "../api/products";
import { updateProfile } from "../api/users";

/* =========================================================
   HELPERS
========================================================= */

function getProductImage(product) {
  if (!product) return null;
  const images = product.images;
  if (images && images.length > 0) {
    const first = images[0];
    if (typeof first === "object" && first.url) return first.url;
    if (typeof first === "string") return first;
  }
  if (product.image) return product.image;
  return null;
}

function formatPrice(price) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function joinedDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, login } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState("listings");
  const [activeListingFilter, setActiveListingFilter] = useState("All");
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Listings state
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  // Per-card action state: { [id]: 'marking-sold' | 'deleting' | null }
  const [cardActions, setCardActions] = useState({});

  // Toast
  const [toast, setToast] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // Fetch user's products
  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    setProductsError(null);
    try {
      const data = await getMyProducts();
      setProducts(data.products || []);
    } catch (err) {
      setProductsError(err.message || "Failed to load listings.");
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchProducts();
  }, [user, fetchProducts]);

  // Derived lists
  const activeListings = products.filter((p) => p.status === "active");
  const soldListings = products.filter((p) => p.status === "sold");
  const filteredListings =
    activeListingFilter === "All"
      ? products
      : activeListingFilter === "Active"
      ? activeListings
      : soldListings;

  // Mark as sold / reactivate
  const handleToggleStatus = async (product) => {
    const newStatus = product.status === "active" ? "sold" : "active";
    setCardActions((prev) => ({ ...prev, [product._id]: "marking-sold" }));
    try {
      await updateProductStatus(product._id, newStatus);
      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id ? { ...p, status: newStatus } : p
        )
      );
      showToast(
        newStatus === "sold" ? "Marked as sold!" : "Listing reactivated!",
        "success"
      );
    } catch (err) {
      showToast(err.message || "Action failed.", "error");
    } finally {
      setCardActions((prev) => ({ ...prev, [product._id]: null }));
    }
  };

  // Delete product
  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.title}"? This cannot be undone.`))
      return;
    setCardActions((prev) => ({ ...prev, [product._id]: "deleting" }));
    try {
      await deleteProduct(product._id);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
      showToast("Listing deleted.", "success");
    } catch (err) {
      showToast(err.message || "Delete failed.", "error");
    } finally {
      setCardActions((prev) => ({ ...prev, [product._id]: null }));
    }
  };

  // Toast helper
  const toastTimer = useRef(null);
  function showToast(message, type = "success") {
    setToast({ message, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF0]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const initials = `${user.firstName || ""} ${user.lastName || ""}`
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  return (
    <main className="min-h-screen bg-[#FDFBF0] px-3 py-5 sm:px-5 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl">

        {/* PROFILE HEADER */}
        <section className="overflow-hidden rounded-[28px] border border-[#EBE6CE] bg-[#FFFDF2] shadow-sm">

          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 hidden w-[43%] bg-[#f4f6ec] lg:block" />

            <div className="relative z-10 grid lg:grid-cols-[1fr_43%]">

              {/* LEFT */}
              <div className="px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

                  {/* Avatar */}
                  <div className="relative shrink-0 self-center sm:self-start">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={`${user.firstName || ""} ${user.lastName || ""}`.trim()}
                        className="h-32 w-32 rounded-full object-cover shadow-lg sm:h-36 sm:w-36"
                      />
                    ) : (
                      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#162033] text-4xl font-black text-white shadow-lg sm:h-36 sm:w-36">
                        {initials}
                      </div>
                    )}
                    <button
                      onClick={() => setShowEditProfile(true)}
                      className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-white text-slate-700 shadow-md transition hover:bg-emerald-50 hover:text-emerald-600"
                      aria-label="Edit profile"
                    >
                      <Camera size={17} />
                    </button>
                  </div>

                  {/* Profile Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="font-archivo text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                        {`${user.firstName || ""} ${user.lastName || ""}`.trim()}
                      </h1>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                        <Check size={15} strokeWidth={3} />
                      </span>
                    </div>

                    {user.college && (
                      <p className="mt-2 text-base font-medium text-slate-800">
                        {user.college}
                      </p>
                    )}

                    {(user.branch || user.year) && (
                      <p className="mt-1 text-sm text-slate-500">
                        {user.branch}
                        {user.branch && user.year && <span className="mx-2">•</span>}
                        {user.year && `${user.year} Year`}
                      </p>
                    )}

                    {user.location && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} />
                        <span>{user.location}</span>
                      </div>
                    )}

                    {user.bio && (
                      <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
                        {user.bio}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                        <ShieldCheck size={15} />
                        Student Verified
                      </div>

                      {user.createdAt && (
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <Clock3 size={15} />
                          Joined {joinedDate(user.createdAt)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <Pencil size={15} />
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* RIGHT — Illustration */}
              <div className="relative hidden items-center justify-center overflow-hidden lg:flex">
                <img
                  src="/illustrations/campus-profile.png"
                  alt="Campus illustration"
                  className="h-auto w-full object-contain"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>

            </div>
          </div>

          {/* STATS ROW */}
          <div className="grid grid-cols-1 gap-3 border-t border-slate-100 bg-white p-4 sm:grid-cols-3 sm:p-5">

            <StatCard
              icon={<BriefcaseBusiness size={22} />}
              value={activeListings.length}
              label="Active Listings"
              description="Items you're selling"
            />
            <StatCard
              icon={<Tag size={22} />}
              value={soldListings.length}
              label="Items Sold"
              description="Successfully sold"
            />
            <StatCard
              icon={<Heart size={22} />}
              value={wishlistItems.length}
              label="Saved Items"
              description="In your wishlist"
            />

          </div>
        </section>

        {/* MAIN DASHBOARD */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">

          {/* LEFT */}
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
                  active={activeTab === "settings"}
                  icon={<Settings size={18} />}
                  label="Settings"
                  onClick={() => setActiveTab("settings")}
                />
              </div>
            </div>

            {/* ---- LISTINGS TAB ---- */}
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

                {/* Filter pills */}
                <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
                  {["All", "Active", "Sold"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveListingFilter(filter)}
                      className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                        activeListingFilter === filter
                          ? "bg-emerald-600 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Loading */}
                {loadingProducts && (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                  </div>
                )}

                {/* Error */}
                {productsError && !loadingProducts && (
                  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-700">
                    <AlertCircle size={18} />
                    {productsError}
                    <button
                      onClick={fetchProducts}
                      className="ml-auto text-xs font-bold underline hover:no-underline"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Grid */}
                {!loadingProducts && !productsError && (
                  filteredListings.length > 0 ? (
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {filteredListings.map((item) => (
                        <ProfileProductCard
                          key={item._id}
                          item={item}
                          actionState={cardActions[item._id]}
                          onToggleStatus={handleToggleStatus}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="No listings found"
                      description={
                        activeListingFilter === "All"
                          ? "You haven't listed anything yet."
                          : `No ${activeListingFilter.toLowerCase()} listings.`
                      }
                      action={
                        <Link
                          to="/sell"
                          className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600"
                        >
                          Sell an Item
                        </Link>
                      }
                    />
                  )
                )}

              </section>
            )}

            {/* ---- SAVED TAB ---- */}
            {activeTab === "saved" && (
              <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <h2 className="font-archivo text-2xl font-black text-slate-950">
                  Saved Items
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Items you've saved for later.
                </p>

                {wishlistItems.length > 0 ? (
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {wishlistItems.map((item) => {
                      const productId = item._id || item.id;
                      const imageUrl = item.image || null;
                      return (
                        <div
                          key={productId}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                        >
                          <div className="relative aspect-square bg-slate-100">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={item.title || item.name}
                                className="h-full w-full object-contain p-5"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-slate-300">
                                <Tag size={28} />
                              </div>
                            )}
                            <button
                              onClick={() => removeFromWishlist(productId)}
                              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow-sm hover:bg-red-50"
                              aria-label="Remove from saved"
                            >
                              <Heart size={15} fill="currentColor" />
                            </button>
                          </div>
                          <div className="p-4">
                            <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
                              {item.title || item.name}
                            </h3>
                            <p className="mt-2 text-base font-black text-emerald-600">
                              {formatPrice(item.price)}
                            </p>
                            <Link
                              to={`/product/${productId}`}
                              className="mt-3 block rounded-lg bg-slate-950 py-2 text-center text-xs font-bold text-white hover:bg-emerald-600"
                            >
                              View Listing
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState
                    title="No saved items"
                    description="Items you wishlist will appear here."
                    action={
                      <Link
                        to="/shop"
                        className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600"
                      >
                        Browse Shop
                      </Link>
                    }
                  />
                )}
              </section>
            )}

            {/* ---- SETTINGS TAB ---- */}
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
                    title="Edit Profile"
                    description="Name, college, bio and other details"
                    onClick={() => setShowEditProfile(true)}
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
                    onClick={handleLogout}
                    className="flex w-full items-center justify-between py-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                        <LogOut size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-red-500">Logout</p>
                        <p className="mt-0.5 text-xs text-slate-400">Sign out of your account</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-300" />
                  </button>
                </div>
              </section>
            )}

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-5">

            {/* Verified badge */}
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="rounded-2xl bg-emerald-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <ShieldCheck size={23} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-emerald-800">Verified Student</p>
                    <p className="mt-0.5 text-xs text-emerald-700/70">
                      Your college is verified
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <VerificationItem text="Student account" />
                {user.college && <VerificationItem text={user.college} />}
                <VerificationItem text="Active student" />
              </div>

              <p className="mt-5 text-xs leading-5 text-slate-500">
                Verified students help build a safer campus community.
              </p>
            </div>

            {/* Quick actions */}
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black text-slate-950">Quick Actions</h3>
              <div className="mt-4 space-y-2">
                <Link
                  to="/sell"
                  className="flex items-center gap-3 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  <Plus size={18} />
                  List a New Item
                </Link>
                <Link
                  to="/shop"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <Tag size={18} />
                  Browse Products
                </Link>
              </div>
            </div>

            {/* Account shortcuts */}
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black text-slate-950">Account</h3>
              <div className="mt-3 divide-y divide-slate-100">
                <SidebarSetting text="Edit Profile" onClick={() => { setShowEditProfile(true); }} />
                <SidebarSetting text="College & Verification" />
                <SidebarSetting text="Privacy & Security" />
                <SidebarSetting text="Help & Support" />
              </div>

              <button
                onClick={handleLogout}
                className="mt-3 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>

          </aside>

        </div>

        {/* BOTTOM BANNER */}
        <section className="relative mt-6 overflow-hidden rounded-[28px] bg-[#E8F7E9] px-6 py-7 sm:px-8">
          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600">
                <Tag size={22} />
              </div>
              <div>
                <h3 className="text-lg font-black text-emerald-900">Buy. Sell. Connect.</h3>
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
              <ArrowRightIcon />
            </Link>
          </div>
        </section>

      </div>

      {/* EDIT PROFILE MODAL */}
      {showEditProfile && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditProfile(false)}
          onSaved={(updatedUser) => {
            const token = localStorage.getItem("token");
            login(token, updatedUser);
            setShowEditProfile(false);
            showToast("Profile updated!", "success");
          }}
        />
      )}

      {/* TOAST */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 rounded-2xl px-5 py-4 shadow-xl text-sm font-bold transition-all ${
            toast.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          {toast.message}
        </div>
      )}

    </main>
  );
}


/* =========================================================
   EDIT PROFILE MODAL
========================================================= */

function EditProfileModal({ user, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: user.name || "",
    college: user.college || "",
    branch: user.branch || "",
    year: user.year || "",
    bio: user.bio || "",
    whatsapp: user.whatsapp || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const data = await updateProfile(form);
      onSaved(data.user);
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-archivo text-2xl font-black text-slate-950">Edit Profile</h2>
            <p className="mt-1 text-sm text-slate-500">Update your profile information.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            ×
          </button>
        </div>

        <div className="mt-7 space-y-4">
          <FormField label="Full Name">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          </FormField>

          <FormField label="College">
            <input
              name="college"
              value={form.college}
              onChange={handleChange}
              className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Branch">
              <input
                name="branch"
                value={form.branch}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />
            </FormField>

            <FormField label="Year">
              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              >
                <option value="">Select Year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
            </FormField>
          </div>

          <FormField label="WhatsApp Number">
            <input
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="+91XXXXXXXXXX"
              className="mt-2 h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          </FormField>

          <FormField label="Bio">
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              placeholder="A few words about yourself..."
            />
          </FormField>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-60"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}


/* =========================================================
   LISTING CARD
========================================================= */

function ProfileProductCard({ item, actionState, onToggleStatus, onDelete }) {
  const imageUrl = getProductImage(item);
  const isSold = item.status === "sold";
  const isMarkingBusy = actionState === "marking-sold";
  const isDeletingBusy = actionState === "deleting";
  const isBusy = isMarkingBusy || isDeletingBusy;

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">

      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <Tag size={28} />
          </div>
        )}

        {/* Edit button */}
        <Link
          to={`/edit-product/${item._id}`}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-500 shadow-sm hover:text-emerald-600"
          title="Edit listing"
        >
          <Pencil size={14} />
        </Link>

        {/* Sold overlay */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[1px]">
            <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow">
              Sold
            </span>
          </div>
        )}
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
            className={`rounded-full px-2 py-1 text-[10px] font-bold ${
              isSold ? "bg-slate-100 text-slate-500" : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {isSold ? "Sold" : "Active"}
          </span>
        </div>

        {item.createdAt && (
          <p className="mt-1 text-[10px] text-slate-400">{timeAgo(item.createdAt)}</p>
        )}

        {/* Action buttons */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onToggleStatus(item)}
            disabled={isBusy}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-bold transition disabled:opacity-60 ${
              isSold
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                : "bg-slate-900 text-white hover:bg-emerald-600"
            }`}
          >
            {isMarkingBusy ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <CheckCircle2 size={12} />
            )}
            {isSold ? "Relist" : "Mark Sold"}
          </button>

          <button
            onClick={() => onDelete(item)}
            disabled={isBusy}
            title="Delete listing"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 disabled:opacity-60"
          >
            {isDeletingBusy ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Trash2 size={13} />
            )}
          </button>
        </div>
      </div>

    </div>
  );
}


/* =========================================================
   SMALL COMPONENTS
========================================================= */

function StatCard({ icon, value, label, description }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-black leading-none text-slate-950">{value}</p>
          <p className="mt-1 text-sm font-bold text-slate-800">{label}</p>
          <p className="mt-0.5 text-xs text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-4 text-sm font-semibold transition ${
        active ? "text-emerald-600" : "text-slate-500 hover:text-slate-900"
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

function VerificationItem({ text }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <Check size={12} strokeWidth={3} />
      </div>
      <span className="text-xs font-medium text-slate-600">{text}</span>
    </div>
  );
}

function SidebarSetting({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between py-3 text-left text-xs font-medium text-slate-600 hover:text-slate-950"
    >
      <span>{text}</span>
      <ChevronRight size={15} className="text-slate-300" />
    </button>
  );
}

function SettingsRow({ title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between gap-4 py-5 text-left"
    >
      <div>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
      <ChevronRight size={18} className="shrink-0 text-slate-300" />
    </button>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-900">{label}</label>
      {children}
    </div>
  );
}

function EmptyState({ title, description, action }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Tag size={23} />
      </div>
      <h3 className="mt-4 text-lg font-black text-slate-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      <div className="mt-5">{action}</div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}