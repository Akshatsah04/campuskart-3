import React, { useState } from "react";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    GraduationCap,
    ArrowRight,
    Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        college: "Manipal University Jaipur",
        branch: "",
        year: "",
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                college: formData.college,
                branch: formData.branch,
                year: Number(formData.year),
                phone: formData.phone,
            });

            // Automatically log the user in
            login(data.token, data.user);

            // Redirect
            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFBF0] px-4 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-[28px] border border-[#EBE6CE] bg-[#FFFDF2] shadow-sm lg:grid-cols-2">

                    {/* LEFT — SIGNUP */}
                    <section className="flex flex-col px-6 py-8 sm:px-10 lg:px-14 lg:py-10">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <Link
                                to="/"
                                className="font-archivo text-xl font-black tracking-tight text-slate-950"
                            >
                                mujshoppers
                            </Link>

                            <p className="text-sm text-slate-500">
                                Already a member?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-emerald-600 hover:text-emerald-700"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>

                        {/* Heading */}
                        <div className="mt-10">
                            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                                Create your account
                            </h1>

                            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                                Join students buying and selling around your campus.
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-7 space-y-3.5"
                        >
                            {/* Name */}
                            <div className="relative">
                                <User
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    required
                                    className="h-13 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                    className="h-13 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                    className="h-13 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-12 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>

                            {/* College */}
                            <div className="relative">
                                <GraduationCap
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="college"
                                    value={formData.college}
                                    onChange={handleChange}
                                    placeholder="College / University"
                                    required
                                    className="h-13 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            {/* Branch */}
                            <div className="relative">
                                <GraduationCap
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    placeholder="Branch / Course"
                                    required
                                    className="h-13 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />
                            </div>

                            {/* Year */}
                            <div className="relative">

                                <GraduationCap
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <select
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                    className="h-13 w-full appearance-none rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-sm text-slate-600 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                >
                                    <option value="">
                                        Select Year
                                    </option>

                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                    <option value="5">5th Year</option>
                                </select>

                            </div>

                            {/* Phone */}
                            <div className="relative">

                                <Phone
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    required
                                    className="h-13 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                />

                            </div>

                            {error && (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* Signup */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Creating account..." : "Create account"}

                                {!loading && <ArrowRight size={17} />}
                            </button>
                        </form>

                        {/* Terms */}
                        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                            By creating an account, you agree to our{" "}
                            <a href="#terms" className="text-slate-600 underline">
                                Terms
                            </a>{" "}
                            and{" "}
                            <a href="#privacy" className="text-slate-600 underline">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </section>

                    {/* RIGHT — ILLUSTRATION */}
                    <section className="relative hidden min-h-[680px] bg-[#f4f6ec] p-8 lg:flex lg:items-center lg:justify-center">
                        <div className="absolute left-8 top-8">
                            <p className="text-sm font-medium text-slate-500">
                                Same campus.
                            </p>

                            <p className="text-lg font-bold text-slate-950">
                                More possibilities.
                            </p>
                        </div>

                        <img
                            src="/illustrations/signup.png"
                            alt="Student joining mujshoppers"
                            className="relative z-10 max-h-[590px] w-full object-contain"
                        />

                        <div className="absolute bottom-8 left-8">
                            <h2 className="max-w-sm text-3xl font-black leading-tight text-slate-950">
                                Buy.
                                <br />
                                Sell.
                                <br />
                                Connect.
                            </h2>
                        </div>

                        <div className="absolute bottom-8 right-8 flex gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-200" />
                            <span className="h-2.5 w-7 rounded-full bg-emerald-600" />
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-200" />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}