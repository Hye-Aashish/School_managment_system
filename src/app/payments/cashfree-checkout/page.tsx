"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

function CashfreeCheckoutContent() {
    const searchParams = useSearchParams();
    const paymentSessionId = searchParams.get("paymentSessionId");
    const orderId = searchParams.get("orderId");
    const courseId = searchParams.get("courseId");
    const courseTitle = searchParams.get("courseTitle") || "Online Course";
    const sandbox = searchParams.get("sandbox") === "true";
    const urlStatus = searchParams.get("status");

    const [status, setStatus] = useState<"loading" | "payment_open" | "verifying" | "success" | "failed">(() => {
        if (urlStatus === "redirect") return "verifying";
        return "loading";
    });
    const [errorMessage, setErrorMessage] = useState("");
    const checkoutInitiated = useRef(false);

    useEffect(() => {
        if (urlStatus === "redirect") {
            // Verify payment on redirect
            verifyPayment();
            return;
        }

        if (!paymentSessionId || !orderId || !courseId) {
            setStatus("failed");
            setErrorMessage("Missing required payment details in query parameters.");
            return;
        }

        if (checkoutInitiated.current) return;
        checkoutInitiated.current = true;

        if (orderId.startsWith("mock_")) {
            setStatus("payment_open");
            return;
        }

        // Load Cashfree SDK dynamically
        const script = document.createElement("script");
        script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
        script.async = true;
        script.onload = () => {
            initializeCashfree();
        };
        script.onerror = () => {
            setStatus("failed");
            setErrorMessage("Failed to load Cashfree library. Please check your network connection.");
        };
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [paymentSessionId, orderId, courseId, urlStatus]);

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
            setErrorMessage(e.message || "Failed to initialize payment gateway.");
        }
    };

    const verifyPayment = async () => {
        try {
            const res = await fetch("/api/student/payments/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: orderId,
                    courseId: courseId,
                    provider: "cashfree"
                })
            });

            const data = await res.json();
            if (data.success && data.data?.success !== false) {
                setStatus("success");
            } else {
                setStatus("failed");
                setErrorMessage(data.error || "Payment verification failed or is still pending.");
            }
        } catch (e: any) {
            setStatus("failed");
            setErrorMessage(e.message || "An error occurred during payment verification.");
        }
    };

    const handleMockSuccess = () => {
        setStatus("verifying");
        // For mock, call verify endpoint to activate enrollment
        fetch("/api/student/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                orderId: orderId,
                courseId: courseId,
                provider: "cashfree",
                isMockSuccessClick: true
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setStatus("success");
            } else {
                setStatus("failed");
                setErrorMessage(data.error || "Verification failed");
            }
        })
        .catch(err => {
            setStatus("failed");
            setErrorMessage(err.message);
        });
    };

    const handleMockFailure = () => {
        setStatus("failed");
        setErrorMessage("Simulated payment transaction was failed/cancelled by the user.");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-6 font-sans">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-[120px] animate-pulse"></div>
            </div>

            <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
                <div className="mb-8">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">School LMS Payment</span>
                    <h2 className="text-xl font-bold mt-1 text-slate-100">{courseTitle}</h2>
                </div>

                {status === "loading" && (
                    <div className="space-y-6 py-6">
                        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                        <div>
                            <p className="text-sm font-bold text-slate-300">Loading Secure Gateway...</p>
                            <p className="text-xs text-slate-500 mt-2">Setting up payment credentials</p>
                        </div>
                    </div>
                )}

                {status === "payment_open" && (
                    <div className="space-y-6 py-6 w-full">
                        {orderId && orderId.startsWith("mock_") ? (
                            <div className="space-y-6">
                                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-yellow-500 text-xs font-semibold leading-relaxed text-left">
                                    ⚠️ **Offline Simulator Mode**: Server could not connect to payment gateway. You can simulate the transaction results locally:
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button 
                                        onClick={handleMockSuccess}
                                        className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 transition-all rounded-xl font-bold text-sm tracking-wide text-white shadow-lg shadow-emerald-600/20"
                                    >
                                        Simulate Payment Success
                                    </button>
                                    <button 
                                        onClick={handleMockFailure}
                                        className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-500 transition-all rounded-xl font-bold text-sm tracking-wide text-white border border-rose-500/20"
                                    >
                                        Simulate Payment Failure
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center animate-pulse mx-auto">
                                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.403.35 2.84.35 4.242 0l.88-.659M9 9.818l.879-.659c1.402-.35 2.84-.35 4.242 0l.88.659m-12.18 2.868l11.75 3.356c.454.13.92-.109 1.074-.537l1.947-5.42a1.002 1.002 0 00-.537-1.274L2.83 5.06a1.002 1.002 0 00-1.274.537L.34 11.838a1.002 1.002 0 00.537 1.274z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-350">Payment Gateway Active</p>
                                    <p className="text-xs text-slate-400 mt-2">Connecting to Cashfree Secure Checkout...</p>
                                </div>
                                <button 
                                    onClick={initializeCashfree}
                                    className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 transition-all rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30"
                                >
                                    Re-open Checkout
                                </button>
                            </>
                        )}
                    </div>
                )}

                {status === "verifying" && (
                    <div className="space-y-6 py-6">
                        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
                        <div>
                            <p className="text-sm font-bold text-slate-350">Verifying Payment...</p>
                            <p className="text-xs text-slate-500 mt-2">Securing your course enrollment license</p>
                        </div>
                    </div>
                )}

                {status === "success" && (
                    <div className="space-y-6 py-6 animate-scale-up">
                        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-emerald-400">Payment Successful!</h3>
                            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                                Your course has been successfully unlocked. You can now safely close this window and return to your school app to start your lessons.
                            </p>
                        </div>
                        <div className="pt-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-900 px-4 py-2 rounded-full border border-white/5">
                                Enrollment Verified
                            </span>
                        </div>
                    </div>
                )}

                {status === "failed" && (
                    <div className="space-y-6 py-6 animate-scale-up w-full">
                        <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mx-auto text-rose-400">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-rose-400">Payment Failed</h3>
                            <p className="text-xs text-slate-400 mt-3 leading-relaxed px-2">
                                {errorMessage || "We encountered an issue while processing your transaction. Please try again."}
                            </p>
                        </div>
                        {paymentSessionId && !orderId?.startsWith("mock_") && (
                            <button 
                                onClick={initializeCashfree}
                                className="w-full py-3 px-6 bg-slate-900 hover:bg-slate-800 transition-all rounded-xl font-bold text-sm tracking-wide border border-white/10"
                            >
                                Retry Payment
                            </button>
                        )}
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-white/5 w-full flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest">
                    <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    256-bit SSL Secured Checkout
                </div>
            </div>
        </div>
    );
}

export default function CashfreeCheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-sans">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Loading secure checkout workspace...</p>
                </div>
            </div>
        }>
            <CashfreeCheckoutContent />
        </Suspense>
    );
}
