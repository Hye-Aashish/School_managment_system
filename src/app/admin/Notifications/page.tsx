"use client";

import { useState, useEffect } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
type NotificationType =
    | "homework" | "lesson_plan" | "exam" | "download" | "live_class"
    | "course" | "behavior" | "cbse_exam" | "attendance" | "timetable"
    | "fees" | "notice" | "transport" | "library" | "custom";

type TargetType = "all" | "class" | "section" | "student";

interface SentNotification {
    _id: string;
    title: string;
    message: string;
    type: NotificationType;
    targetType: TargetType;
    targetClass?: string;
    targetSection?: string;
    targetAdmissionNo?: string;
    recipientCount: number;
    createdAt: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const NOTIFICATION_TYPES: { value: NotificationType; label: string; emoji: string }[] = [
    { value: "custom", label: "Custom / General", emoji: "🔔" },
    { value: "homework", label: "Homework", emoji: "📚" },
    { value: "lesson_plan", label: "Lesson Plan", emoji: "📖" },
    { value: "exam", label: "Online Exam", emoji: "📝" },
    { value: "download", label: "Download Center", emoji: "⬇️" },
    { value: "live_class", label: "Live Class", emoji: "🎥" },
    { value: "course", label: "Online Course", emoji: "🎓" },
    { value: "behavior", label: "Behavior Update", emoji: "⭐" },
    { value: "cbse_exam", label: "CBSE Exam", emoji: "🏫" },
    { value: "attendance", label: "Attendance", emoji: "✅" },
    { value: "timetable", label: "Timetable Change", emoji: "📅" },
    { value: "fees", label: "Fees Due", emoji: "💰" },
    { value: "notice", label: "Notice Board", emoji: "📢" },
    { value: "transport", label: "Transport", emoji: "🚌" },
    { value: "library", label: "Library", emoji: "📚" },
];

const TYPE_ROUTES: Record<NotificationType, string> = {
    homework: "/homework",
    lesson_plan: "/lesson-plans",
    exam: "/exams",
    download: "/downloads",
    live_class: "/live-classes",
    course: "/lms",
    behavior: "/behavior",
    cbse_exam: "/cbse-exam",
    attendance: "/attendance",
    timetable: "/timetable",
    fees: "/fees",
    notice: "/notice-board",
    transport: "/transport",
    library: "/library",
    custom: "/notifications",
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function NotificationsPage() {
    const [tab, setTab] = useState<"send" | "history">("send");

    // Form state
    const [form, setForm] = useState({
        title: "",
        message: "",
        type: "custom" as NotificationType,
        targetType: "all" as TargetType,
        targetClass: "",
        targetSection: "",
        targetAdmissionNo: "",
    });

    // Classes and sections (for dropdowns)
    const [classes, setClasses] = useState<string[]>([]);
    const [sections, setSections] = useState<string[]>([]);

    // Send state
    const [sending, setSending] = useState(false);
    const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);

    // History state
    const [history, setHistory] = useState<SentNotification[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [historyFilter, setHistoryFilter] = useState<NotificationType | "all">("all");

    // Load classes
    useEffect(() => {
        fetch("/api/classes")
            .then((r) => r.json())
            .then((data) => {
                const classList = data.data?.map((c: any) => c.class || c.name) ?? [];
                setClasses([...new Set<string>(classList)]);
            })
            .catch(() => {});
    }, []);

    // Load sections when class changes
    useEffect(() => {
        if (!form.targetClass) { setSections([]); return; }
        fetch(`/api/sections?class=${form.targetClass}`)
            .then((r) => r.json())
            .then((data) => {
                const sectionList = data.data?.map((s: any) => s.section || s.name) ?? [];
                setSections([...new Set<string>(sectionList)]);
            })
            .catch(() => {});
    }, [form.targetClass]);

    // Load history
    useEffect(() => {
        if (tab !== "history") return;
        setHistoryLoading(true);
        fetch("/api/notifications?admin=true&limit=100")
            .then((r) => r.json())
            .then((data) => setHistory(data.data ?? []))
            .catch(() => setHistory([]))
            .finally(() => setHistoryLoading(false));
    }, [tab]);

    const handleSend = async () => {
        if (!form.title.trim() || !form.message.trim()) {
            setSendResult({ success: false, message: "Title and message are required." });
            return;
        }
        setSending(true);
        setSendResult(null);
        try {
            const payload = {
                title: form.title,
                message: form.message,
                type: form.type,
                route: TYPE_ROUTES[form.type],
                targetType: form.targetType,
                ...(form.targetType !== "all" && { targetClass: form.targetClass }),
                ...(form.targetType === "section" && { targetSection: form.targetSection }),
                ...(form.targetType === "student" && { targetAdmissionNo: form.targetAdmissionNo }),
            };
            const res = await fetch("/api/notifications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.success) {
                setSendResult({
                    success: true,
                    message: `✅ Sent to ${data.data?.recipientTokens ?? 0} device(s) successfully!`,
                });
                setForm((prev) => ({ ...prev, title: "", message: "" }));
            } else {
                setSendResult({ success: false, message: data.error ?? "Failed to send notification." });
            }
        } catch (err) {
            setSendResult({ success: false, message: "Network error. Please try again." });
        } finally {
            setSending(false);
        }
    };

    const filteredHistory = historyFilter === "all"
        ? history
        : history.filter((n) => n.type === historyFilter);

    const selectedType = NOTIFICATION_TYPES.find((t) => t.value === form.type);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b px-6 py-5">
                <h1 className="text-2xl font-bold text-gray-900">🔔 Push Notifications</h1>
                <p className="text-sm text-gray-500 mt-1">Send targeted notifications to students via Firebase Cloud Messaging</p>
            </div>

            {/* Tabs */}
            <div className="px-6 pt-4">
                <div className="flex gap-2 border-b">
                    {(["send", "history"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${
                                tab === t
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {t === "send" ? "📤 Send Notification" : "📋 History"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-6 py-6">
                {/* ── SEND TAB ── */}
                {tab === "send" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Form */}
                        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm p-6 space-y-5">
                            <h2 className="text-lg font-semibold text-gray-800">Compose Notification</h2>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Notification Type</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value as NotificationType })}
                                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    {NOTIFICATION_TYPES.map((t) => (
                                        <option key={t.value} value={t.value}>
                                            {t.emoji} {t.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Target */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {(["all", "class", "section", "student"] as TargetType[]).map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setForm({ ...form, targetType: t, targetClass: "", targetSection: "", targetAdmissionNo: "" })}
                                            className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                                                form.targetType === t
                                                    ? "bg-blue-600 text-white border-blue-600"
                                                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                                            }`}
                                        >
                                            {t === "all" ? "🌍 All Students" : t === "class" ? "🏫 By Class" : t === "section" ? "📋 By Section" : "👤 Individual"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Class/Section/Student selectors */}
                            {form.targetType !== "all" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(form.targetType === "class" || form.targetType === "section") && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                                            <select
                                                value={form.targetClass}
                                                onChange={(e) => setForm({ ...form, targetClass: e.target.value, targetSection: "" })}
                                                className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                            >
                                                <option value="">Select Class</option>
                                                {classes.map((c) => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                    )}
                                    {form.targetType === "section" && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                                            <select
                                                value={form.targetSection}
                                                onChange={(e) => setForm({ ...form, targetSection: e.target.value })}
                                                className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                disabled={!form.targetClass}
                                            >
                                                <option value="">Select Section</option>
                                                {sections.map((s) => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    )}
                                    {form.targetType === "student" && (
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Admission Number</label>
                                            <input
                                                type="text"
                                                value={form.targetAdmissionNo}
                                                onChange={(e) => setForm({ ...form, targetAdmissionNo: e.target.value })}
                                                placeholder="e.g. 2024001"
                                                className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notification Title *</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="Enter notification title..."
                                    maxLength={100}
                                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                <p className="text-xs text-gray-400 mt-1">{form.title.length}/100</p>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                                <textarea
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    placeholder="Enter notification message..."
                                    rows={4}
                                    maxLength={300}
                                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                />
                                <p className="text-xs text-gray-400 mt-1">{form.message.length}/300</p>
                            </div>

                            {/* Result */}
                            {sendResult && (
                                <div className={`p-3 rounded-lg text-sm font-medium ${
                                    sendResult.success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                                }`}>
                                    {sendResult.message}
                                </div>
                            )}

                            {/* Send button */}
                            <button
                                onClick={handleSend}
                                disabled={sending || !form.title.trim() || !form.message.trim()}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors"
                            >
                                {sending ? "Sending..." : "📤 Send Notification"}
                            </button>
                        </div>

                        {/* Preview */}
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Preview</h2>
                            <div className="bg-gray-900 rounded-2xl p-4 text-white">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-xs">S</div>
                                    <span className="text-xs text-gray-400">School CRM • now</span>
                                </div>
                                <div className="bg-gray-800 rounded-xl p-3">
                                    <p className="text-sm font-semibold">
                                        {selectedType?.emoji} {form.title || "Notification Title"}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                        {form.message || "Notification message will appear here..."}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2 text-xs text-gray-500">
                                <div className="flex justify-between">
                                    <span>Type:</span>
                                    <span className="font-medium">{selectedType?.label}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Target:</span>
                                    <span className="font-medium capitalize">
                                        {form.targetType === "all" ? "All Students" :
                                            form.targetType === "class" ? `Class ${form.targetClass || "?"}` :
                                            form.targetType === "section" ? `Class ${form.targetClass || "?"} - ${form.targetSection || "?"}` :
                                            `Student: ${form.targetAdmissionNo || "?"}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Deep Link:</span>
                                    <span className="font-mono text-xs">{TYPE_ROUTES[form.type]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── HISTORY TAB ── */}
                {tab === "history" && (
                    <div className="bg-white rounded-xl border shadow-sm">
                        <div className="p-5 border-b flex flex-wrap gap-2 items-center">
                            <span className="text-sm font-medium text-gray-700">Filter by type:</span>
                            <button
                                onClick={() => setHistoryFilter("all")}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${historyFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                            >
                                All
                            </button>
                            {NOTIFICATION_TYPES.map((t) => (
                                <button
                                    key={t.value}
                                    onClick={() => setHistoryFilter(t.value)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${historyFilter === t.value ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                                >
                                    {t.emoji} {t.label}
                                </button>
                            ))}
                        </div>

                        {historyLoading ? (
                            <div className="flex justify-center py-16">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                            </div>
                        ) : filteredHistory.length === 0 ? (
                            <div className="text-center py-16 text-gray-400">
                                <p className="text-4xl mb-3">🔕</p>
                                <p className="text-sm">No notifications sent yet</p>
                            </div>
                        ) : (
                            <div className="divide-y">
                                {filteredHistory.map((n) => {
                                    const typeInfo = NOTIFICATION_TYPES.find((t) => t.value === n.type);
                                    return (
                                        <div key={n._id} className="px-5 py-4 flex items-start gap-4 hover:bg-gray-50">
                                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-lg flex-shrink-0">
                                                {typeInfo?.emoji ?? "🔔"}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="font-semibold text-sm text-gray-900">{n.title}</p>
                                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                                                        {typeInfo?.label ?? n.type}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                                                <div className="flex gap-4 mt-1.5 text-xs text-gray-400">
                                                    <span>Target: <span className="font-medium capitalize">{n.targetType}{n.targetClass ? ` - ${n.targetClass}` : ""}{n.targetSection ? ` / ${n.targetSection}` : ""}{n.targetAdmissionNo ? ` (${n.targetAdmissionNo})` : ""}</span></span>
                                                    <span>📱 {n.recipientCount} recipient{n.recipientCount !== 1 ? "s" : ""}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400 whitespace-nowrap">
                                                {new Date(n.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
