import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            login(data.token, data.user);

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

                    {/* LEFT — LOGIN */}
                    <section className="flex flex-col px-6 py-8 sm:px-10 lg:px-14 lg:py-10">

                        {/* Logo */}
                        <div className="flex items-center justify-between">
                            <Link
                                to="/"
                                className="font-archivo text-xl font-black tracking-tight text-slate-950"
                            >
                                mujshoppers
                            </Link>

                            <p className="text-sm text-slate-500">
                                New here?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-emerald-600 hover:text-emerald-700"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        {/* Heading */}
                        <div className="mt-14">
                            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                                Welcome back!
                            </h1>

                            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                                Buy, sell and discover everything around your campus.
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-4"
                        >
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
                                    className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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
                                    className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-12 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
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

                            {error && (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* Forgot password */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="text-sm font-medium text-slate-700 hover:text-emerald-600"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Login button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Logging in..." : "Login"}

                                {!loading && <ArrowRight size={17} />}
                            </button>
                        </form>

                        {/* Bottom */}
                        <div className="mt-auto pt-10 text-center text-sm text-slate-500">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-emerald-600 hover:text-emerald-700"
                            >
                                Sign up now
                            </Link>
                        </div>
                    </section>

                    {/* RIGHT — ILLUSTRATION */}
                    <section className="relative hidden min-h-[680px] bg-[#f4f6ec] p-8 lg:flex lg:items-center lg:justify-center">
                        <div className="absolute left-8 top-8">
                            <p className="text-sm font-medium text-slate-500">
                                Your campus.
                            </p>

                            <p className="text-lg font-bold text-slate-950">
                                Your marketplace.
                            </p>
                        </div>

                        <img
                            src="/illustrations/login.png"
                            alt="Student using mujshoppers"
                            className="relative z-10 max-h-[570px] w-full object-contain"
                        />

                        <div className="absolute bottom-8 left-8">
                            <h2 className="max-w-sm text-3xl font-black leading-tight text-slate-950">
                                Good deals.
                                <br />
                                Better connections.
                            </h2>
                        </div>

                        <div className="absolute bottom-8 right-8 flex gap-1.5">
                            <span className="h-2.5 w-7 rounded-full bg-emerald-600" />
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-200" />
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-200" />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}