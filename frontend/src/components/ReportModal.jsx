import React, { useState } from "react";
import { AlertTriangle, X, CheckCircle2 } from "lucide-react";
import { submitReport } from "../api/reports";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ReportModal({ productId, productTitle, isOpen, onClose }) {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [reason, setReason] = useState("Inappropriate Content");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const reasons = [
        "Inappropriate Content",
        "Scam or Fraud",
        "Misleading Information",
        "Duplicate or Spam Listing",
        "Prohibited Item",
        "Other"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        if (!description.trim()) {
            setError("Please provide a brief description of the issue.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await submitReport({
                productId,
                reason,
                description
            });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setDescription("");
                onClose();
            }, 2000);
        } catch (err) {
            setError(err.message || "Failed to submit report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <h3 className="font-archivo text-lg font-black text-slate-900">
                            Report Listing
                        </h3>
                        <p className="truncate text-xs text-slate-500 max-w-[260px]">
                            {productTitle}
                        </p>
                    </div>
                </div>

                {success ? (
                    <div className="my-8 flex flex-col items-center text-center">
                        <CheckCircle2 size={44} className="text-emerald-600" />
                        <h4 className="mt-3 text-base font-bold text-slate-900">
                            Report Submitted
                        </h4>
                        <p className="mt-1 text-xs text-slate-500">
                            Thank you for helping keep the CampusKart community safe.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Reason
                            </label>
                            <select
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white"
                            >
                                {reasons.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Details
                            </label>
                            <textarea
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Explain why you are reporting this listing..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white resize-none"
                            />
                        </div>

                        <div className="flex gap-2.5 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
                            >
                                {loading ? "Submitting..." : "Submit Report"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
