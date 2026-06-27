"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

function FeeCheckoutContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const feeMasterId = searchParams.get("feeMasterId");
    const amount = searchParams.get("amount"); // in rupees (not paise)
    const keyId = searchParams.get("keyId");
    const feeTitle = searchParams.get("feeTitle") || "School Fee";
    const studentId = searchParams.get("studentId");
    const paymentSessionId = searchParams.get("paymentSessionId");
    const discountCode = searchParams.get("discountCode");
    const sandbox = searchParams.get("sandbox") === "true";
    const urlStatus = searchParams.get("status");
    const errorParam = searchParams.get("error");

    const [status, setStatus] = useState<"loading" | "payment_open" | "verifying" | "success" | "failed">(() => {
        if (urlStatus === "success") return "success";
        if (urlStatus === "failed") return "failed";
        if (urlStatus === "redirect") return "verifying";
        return "loading";
    });
    const [errorMessage, setErrorMessage] = useState(() => {
        if (urlStatus === "failed" && errorParam) return decodeURIComponent(errorParam);
        return "";
    });
    const [paidAmount, setPaidAmount] = useState<number | null>(null);
    const [outstanding, setOutstanding] = useState<number | null>(null);
    const checkoutInitiated = useRef(false);

    const amountRupees = Number(amount || 0);
    const amountPaise = Math.round(amountRupees * 100);

    useEffect(() => {
        if (urlStatus === "success" || urlStatus === "failed") return;

        if (urlStatus === "redirect") {
            // Verify Cashfree payment on redirect back
            verifyPayment();
            return;
        }

        if (!orderId || !feeMasterId || !amount) {
            setStatus("failed");
            setErrorMessage("Missing required payment details.");
            return;
        }
        if (checkoutInitiated.current) return;
        checkoutInitiated.current = true;

        if (orderId.startsWith("mock_fee_")) {
            setStatus("payment_open");
            return;
        }

        // Load Razorpay if keyId provided (Razorpay flow)
        if (keyId) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => initializeRazorpay();
            script.onerror = () => {
                setStatus("failed");
                setErrorMessage("Failed to load Razorpay library. Check your network connection.");
            };
            document.body.appendChild(script);
            return () => { if (document.body.contains(script)) document.body.removeChild(script); };
        }

        // Cashfree hosted checkout — load Cashfree SDK if paymentSessionId is present
        if (paymentSessionId) {
            const script = document.createElement("script");
            script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
            script.async = true;
            script.onload = () => initializeCashfree();
            script.onerror = () => {
                setStatus("failed");
                setErrorMessage("Failed to load Cashfree library. Check your network connection.");
            };
            document.body.appendChild(script);
            return () => { if (document.body.contains(script)) document.body.removeChild(script); };
        } else {
            setStatus("failed");
            setErrorMessage("No valid payment gateway configuration received.");
        }
    }, [orderId, feeMasterId, amount, keyId, urlStatus, paymentSessionId]);

    const initializeRazorpay = () => {
        if (orderId?.startsWith("mock_fee_")) {
            setStatus("payment_open");
            return;
        }
        try {
            const options = {
                key: keyId,
                amount: amountPaise,
                currency: "INR",
                name: "School Fee Portal",
                description: feeTitle,
                order_id: orderId,
                callback_url: `${window.location.origin}/api/student/fees/pay/razorpay-callback?feeMasterId=${feeMasterId}&studentId=${studentId}&amount=${amountRupees}${discountCode ? `&discountCode=${discountCode}` : ""}`,
                redirect: true,
                modal: {
                    ondismiss: function () {
                        setStatus("failed");
                        setErrorMessage("Payment gateway was closed before completing the transaction.");
                    },
                },
                prefill: { name: "Student", email: "student@school.com" },
                theme: { color: "#6366F1" },
            };
            const rzp = new (window as any).Razorpay(options);
            setStatus("payment_open");
            rzp.open();
        } catch (e: any) {
            setStatus("failed");
            setErrorMessage(e.message || "Failed to initialize payment gateway.");
        }
    };

    const initializeCashfree = () => {
        try {
            const cashfree = (window as any).Cashfree({
                mode: sandbox ? "sandbox" : "production"
            });
            setStatus("payment_open");
            cashfree.checkout({
                paymentSessionId: paymentSessionId,
                redirectTarget: "_self"
            });
        } catch (e: any) {
            setStatus("failed");
            setErrorMessage(e.message || "Failed to initialize Cashfree payment gateway.");
        }
    };

    const verifyPayment = async (rzpResponse?: any, isMockSuccessClick?: boolean) => {
        setStatus("verifying");
        try {
            const res = await fetch("/api/student/fees/pay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    feeMasterId,
                    orderId,
                    amount: amountRupees,
                    provider: keyId ? "razorpay" : "cashfree",
                    razorpay_payment_id: rzpResponse?.razorpay_payment_id,
                    razorpay_signature: rzpResponse?.razorpay_signature,
                    discountCode,
                    isMockSuccessClick,
                }),
            });
            const data = await res.json();
            if (data.success && data.data?.success) {
                setPaidAmount(data.data.paid ?? null);
                setOutstanding(data.data.outstanding ?? null);
                setStatus("success");
            } else {
                setStatus("failed");
                setErrorMessage(data.error || data.data?.status || "Payment verification failed.");
            }
        } catch (e: any) {
            setStatus("failed");
            setErrorMessage(e.message || "An error occurred during payment verification.");
        }
    };

    const handleMockSuccess = () => verifyPayment({}, true);
    const handleMockFailure = () => {
        setStatus("failed");
        setErrorMessage("Simulated payment failure.");
    };

    const fmtINR = (n: number) =>
        new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(n);

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-6 font-sans">
            {/* Background gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] animate-pulse" />
            </div>

            {/* Glass card */}
            <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
                {/* Header */}
                <div className="mb-8">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-violet-400">School Fee Payment</span>
                    <h2 className="text-xl font-bold mt-1 text-slate-100">{feeTitle}</h2>
                    <div className="mt-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full inline-flex items-center gap-2">
                        <span className="text-xs text-slate-400">Amount Due:</span>
                        <span className="text-sm font-bold text-violet-300">{fmtINR(amountRupees)}</span>
                    </div>
                </div>

                {/* Loading */}
                {status === "loading" && (
                    <div className="space-y-6 py-6">
                        <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mx-auto" />
                        <div>
                            <p className="text-sm font-bold text-slate-300">Loading Secure Gateway...</p>
                            <p className="text-xs text-slate-500 mt-2">Setting up payment credentials</p>
                        </div>
                    </div>
                )}

                {/* Payment open / mock */}
                {status === "payment_open" && (
                    <div className="space-y-6 py-4 w-full">
                        {orderId?.startsWith("mock_fee_") ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-yellow-400 text-xs font-semibold leading-relaxed text-left">
                                    ⚠️ <strong>Test/Sandbox Mode</strong>: Gateway could not connect. Simulate payment result below:
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleMockSuccess}
                                        className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 transition-all rounded-xl font-bold text-sm text-white shadow-lg shadow-emerald-600/20"
                                    >
                                        ✓ Simulate Payment Success
                                    </button>
                                    <button
                                        onClick={handleMockFailure}
                                        className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-500 transition-all rounded-xl font-bold text-sm text-white"
                                    >
                                        ✗ Simulate Payment Failure
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-violet-500/10 border border-violet-500/30 rounded-full flex items-center justify-center animate-pulse mx-auto">
                                    <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-300">Payment Gateway Opened</p>
                                    <p className="text-xs text-slate-400 mt-2">Complete the payment in the checkout window.</p>
                                </div>
                                <button
                                    onClick={initializeRazorpay}
                                    className="w-full py-3 px-6 bg-violet-600 hover:bg-violet-500 transition-all rounded-xl font-bold text-sm shadow-lg shadow-violet-600/30"
                                >
                                    Re-open Checkout
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* Verifying */}
                {status === "verifying" && (
                    <div className="space-y-6 py-6">
                        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto" />
                        <div>
                            <p className="text-sm font-bold text-slate-300">Verifying Payment...</p>
                            <p className="text-xs text-slate-500 mt-2">Recording your fee payment</p>
                        </div>
                    </div>
                )}

                {/* Success */}
                {status === "success" && (
                    <div className="space-y-6 py-4 w-full">
                        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-emerald-400">Payment Successful!</h3>
                            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                                Your fee payment of <strong className="text-white">{fmtINR(amountRupees)}</strong> has been recorded.
                                You can safely close this window and return to the school app.
                            </p>
                            {outstanding !== null && (
                                <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
                                    <span className="text-xs text-slate-400">Remaining Balance: </span>
                                    <span className="text-sm font-bold text-violet-300">{fmtINR(outstanding)}</span>
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-900 px-4 py-2 rounded-full border border-white/5">
                            Fee Payment Recorded
                        </span>
                    </div>
                )}

                {/* Failed */}
                {status === "failed" && (
                    <div className="space-y-6 py-4 w-full">
                        <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mx-auto text-rose-400">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-rose-400">Payment Failed</h3>
                            <p className="text-xs text-slate-400 mt-3 leading-relaxed px-2">
                                {errorMessage || "An issue occurred while processing your payment. Please try again."}
                            </p>
                        </div>
                        <button
                            onClick={() => { checkoutInitiated.current = false; setStatus("loading"); }}
                            className="w-full py-3 px-6 bg-slate-900 hover:bg-slate-800 transition-all rounded-xl font-bold text-sm border border-white/10"
                        >
                            Retry Payment
                        </button>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-white/5 w-full flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest">
                    <svg className="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    256-bit SSL Secured
                </div>
            </div>
        </div>
    );
}

export default function FeeCheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Loading secure checkout...</p>
                </div>
            </div>
        }>
            <FeeCheckoutContent />
        </Suspense>
    );
}
