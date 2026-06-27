"use client";
import React, { useState, useEffect } from "react";

type ProviderConfig = {
     provider: "razorpay" | "cashfree";
     enabled: boolean;
     keyId: string;
     keySecret: string;
     sandbox: boolean;
};

export default function PaymentGatewaySettings() {
     const [loading, setLoading] = useState(true);
     const [savingProvider, setSavingProvider] = useState<"razorpay" | "cashfree" | null>(null);

     // Configurations state
     const [razorpayConfig, setRazorpayConfig] = useState<ProviderConfig>({
          provider: "razorpay",
          enabled: false,
          keyId: "",
          keySecret: "",
          sandbox: true
     });

     const [cashfreeConfig, setCashfreeConfig] = useState<ProviderConfig>({
          provider: "cashfree",
          enabled: false,
          keyId: "",
          keySecret: "",
          sandbox: true
     });

     // Visibility of secrets
     const [showRazorpaySecret, setShowRazorpaySecret] = useState(false);
     const [showCashfreeSecret, setShowCashfreeSecret] = useState(false);

     useEffect(() => {
          const fetchConfigs = async () => {
               setLoading(true);
               try {
                    const res = await fetch("/api/payment-config?admin=true");
                    const data = await res.json();
                    if (data.success && Array.isArray(data.data)) {
                         const rzp = data.data.find((c: any) => c.provider === "razorpay");
                         const cf = data.data.find((c: any) => c.provider === "cashfree");

                         if (rzp) setRazorpayConfig(rzp);
                         if (cf) setCashfreeConfig(cf);
                    }
               } catch (error) {
                    console.error("Failed to load payment configurations:", error);
               } finally {
                    setLoading(false);
               }
          };

          fetchConfigs();
     }, []);

     const handleSave = async (provider: "razorpay" | "cashfree") => {
          const config = provider === "razorpay" ? razorpayConfig : cashfreeConfig;
          setSavingProvider(provider);
          try {
               const res = await fetch("/api/payment-config", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(config)
               });
               const data = await res.json();
               if (data.success) {
                    alert(`${provider === "razorpay" ? "Razorpay" : "Cashfree"} configuration saved successfully!`);
               } else {
                    alert(data.error || "Failed to save configuration");
               }
          } catch (error) {
               console.error("Error saving configuration:", error);
               alert("An error occurred while saving the configuration.");
          } finally {
               setSavingProvider(null);
          }
     };

     return (
          <div className="flex flex-col space-y-6 px-1">
               {/* Page Header */}
               <section className="bg-white dark:bg-darkblack-600 rounded-2xl p-6 shadow-sm border border-bgray-200 dark:border-darkblack-400">
                    <div className="flex flex-col">
                         <h3 className="text-xl font-bold dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                              <div className="w-1.5 h-6 bg-success-300 rounded-full"></div>
                              Payment Gateway Integrations
                         </h3>
                         <p className="text-[10px] font-bold text-bgray-400 uppercase tracking-widest mt-1">
                              Configure credentials and environment mode for transaction processors
                         </p>
                    </div>
               </section>

               {loading ? (
                    <div className="py-24 text-center">
                         <div className="w-10 h-10 mx-auto border-4 border-success-300/20 border-t-success-300 rounded-full animate-spin"></div>
                    </div>
               ) : (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {/* Razorpay Integration Card */}
                         <div className="bg-white dark:bg-darkblack-600 rounded-3xl p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400 flex flex-col justify-between hover:shadow-lg transition-all border-t-[8px] border-t-blue-500">
                              <div className="space-y-6">
                                   <div className="flex justify-between items-center pb-4 border-b border-bgray-100 dark:border-darkblack-400">
                                        <div className="flex items-center space-x-3">
                                             <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 text-lg font-black tracking-tighter">
                                                  R
                                             </div>
                                             <div>
                                                  <h4 className="text-lg font-black dark:text-white uppercase tracking-tighter">Razorpay</h4>
                                                  <p className="text-[9px] font-bold text-bgray-400 uppercase tracking-wider">Credit Card, Net Banking, UPI</p>
                                             </div>
                                        </div>
                                        {/* Status Toggle Switch */}
                                        <label className="relative inline-flex items-center cursor-pointer">
                                             <input
                                                  type="checkbox"
                                                  checked={razorpayConfig.enabled}
                                                  onChange={(e) => setRazorpayConfig({ ...razorpayConfig, enabled: e.target.checked })}
                                                  className="sr-only peer"
                                             />
                                             <div className="w-11 h-6 bg-bgray-200 peer-focus:outline-none rounded-full peer dark:bg-darkblack-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-bgray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                                             <span className="ms-3 text-xs font-black text-bgray-500 dark:text-bgray-350 uppercase tracking-widest">
                                                  {razorpayConfig.enabled ? "Active" : "Inactive"}
                                             </span>
                                        </label>
                                   </div>

                                   {/* Fields */}
                                   <div className="space-y-4">
                                        {/* Sandbox Toggle */}
                                        <div className="flex justify-between items-center bg-bgray-50 dark:bg-darkblack-500 p-4 rounded-xl">
                                             <div className="flex flex-col">
                                                  <span className="text-xs font-black dark:text-white uppercase tracking-tighter">Test Sandbox Mode</span>
                                                  <span className="text-[8px] font-bold text-bgray-400 uppercase tracking-wider mt-0.5">Use keys labeled with rzp_test_</span>
                                             </div>
                                             <label className="relative inline-flex items-center cursor-pointer">
                                                  <input
                                                       type="checkbox"
                                                       checked={razorpayConfig.sandbox}
                                                       onChange={(e) => setRazorpayConfig({ ...razorpayConfig, sandbox: e.target.checked })}
                                                       className="sr-only peer"
                                                  />
                                                  <div className="w-11 h-6 bg-bgray-200 rounded-full peer dark:bg-darkblack-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-bgray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-300"></div>
                                             </label>
                                        </div>

                                        <div className="space-y-1.5">
                                             <label className="text-[9px] font-black text-bgray-400 uppercase tracking-widest px-1">Razorpay Key ID</label>
                                             <input
                                                  type="text"
                                                  value={razorpayConfig.keyId}
                                                  onChange={(e) => setRazorpayConfig({ ...razorpayConfig, keyId: e.target.value })}
                                                  placeholder="rzp_test_..."
                                                  className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-blue-500/30"
                                             />
                                        </div>

                                        <div className="space-y-1.5">
                                             <label className="text-[9px] font-black text-bgray-400 uppercase tracking-widest px-1">Razorpay Key Secret</label>
                                             <div className="relative">
                                                  <input
                                                       type={showRazorpaySecret ? "text" : "password"}
                                                       value={razorpayConfig.keySecret}
                                                       onChange={(e) => setRazorpayConfig({ ...razorpayConfig, keySecret: e.target.value })}
                                                       placeholder="••••••••••••••••••••••••"
                                                       className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl pl-5 pr-12 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-blue-500/30"
                                                  />
                                                  <button
                                                       type="button"
                                                       onClick={() => setShowRazorpaySecret(!showRazorpaySecret)}
                                                       className="absolute right-4 top-1/2 -translate-y-1/2 text-bgray-400 hover:text-bgray-600 dark:hover:text-white transition-colors"
                                                  >
                                                       {showRazorpaySecret ? (
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                                       ) : (
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                       )}
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              <button
                                   onClick={() => handleSave("razorpay")}
                                   disabled={savingProvider === "razorpay"}
                                   className="mt-8 w-full h-12 bg-blue-500 text-white font-black rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all uppercase tracking-widest text-[10px]"
                              >
                                   {savingProvider === "razorpay" ? "Saving settings..." : "Commit Razorpay Configuration"}
                              </button>
                         </div>

                         {/* Cashfree Integration Card */}
                         <div className="bg-white dark:bg-darkblack-600 rounded-3xl p-8 shadow-sm border border-bgray-200 dark:border-darkblack-400 flex flex-col justify-between hover:shadow-lg transition-all border-t-[8px] border-t-cyan-500">
                              <div className="space-y-6">
                                   <div className="flex justify-between items-center pb-4 border-b border-bgray-100 dark:border-darkblack-400">
                                        <div className="flex items-center space-x-3">
                                             <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 text-lg font-black tracking-tighter">
                                                  C
                                             </div>
                                             <div>
                                                  <h4 className="text-lg font-black dark:text-white uppercase tracking-tighter">Cashfree</h4>
                                                  <p className="text-[9px] font-bold text-bgray-400 uppercase tracking-wider">UPI, Cards, Wallets, PayLater</p>
                                             </div>
                                        </div>
                                        {/* Status Toggle Switch */}
                                        <label className="relative inline-flex items-center cursor-pointer">
                                             <input
                                                  type="checkbox"
                                                  checked={cashfreeConfig.enabled}
                                                  onChange={(e) => setCashfreeConfig({ ...cashfreeConfig, enabled: e.target.checked })}
                                                  className="sr-only peer"
                                             />
                                             <div className="w-11 h-6 bg-bgray-200 peer-focus:outline-none rounded-full peer dark:bg-darkblack-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-bgray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-500"></div>
                                             <span className="ms-3 text-xs font-black text-bgray-500 dark:text-bgray-350 uppercase tracking-widest">
                                                  {cashfreeConfig.enabled ? "Active" : "Inactive"}
                                             </span>
                                        </label>
                                   </div>

                                   {/* Fields */}
                                   <div className="space-y-4">
                                        {/* Sandbox Toggle */}
                                        <div className="flex justify-between items-center bg-bgray-50 dark:bg-darkblack-500 p-4 rounded-xl">
                                             <div className="flex flex-col">
                                                  <span className="text-xs font-black dark:text-white uppercase tracking-tighter">Test Sandbox Mode</span>
                                                  <span className="text-[8px] font-bold text-bgray-400 uppercase tracking-wider mt-0.5">Use sandbox credentials</span>
                                             </div>
                                             <label className="relative inline-flex items-center cursor-pointer">
                                                  <input
                                                       type="checkbox"
                                                       checked={cashfreeConfig.sandbox}
                                                       onChange={(e) => setCashfreeConfig({ ...cashfreeConfig, sandbox: e.target.checked })}
                                                       className="sr-only peer"
                                                  />
                                                  <div className="w-11 h-6 bg-bgray-200 rounded-full peer dark:bg-darkblack-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-bgray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-300"></div>
                                             </label>
                                        </div>

                                        <div className="space-y-1.5">
                                             <label className="text-[9px] font-black text-bgray-400 uppercase tracking-widest px-1">Cashfree App ID</label>
                                             <input
                                                  type="text"
                                                  value={cashfreeConfig.keyId}
                                                  onChange={(e) => setCashfreeConfig({ ...cashfreeConfig, keyId: e.target.value })}
                                                  placeholder="e.g. 123456789abc"
                                                  className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl px-5 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-cyan-500/30"
                                             />
                                        </div>

                                        <div className="space-y-1.5">
                                             <label className="text-[9px] font-black text-bgray-400 uppercase tracking-widest px-1">Cashfree Secret Key</label>
                                             <div className="relative">
                                                  <input
                                                       type={showCashfreeSecret ? "text" : "password"}
                                                       value={cashfreeConfig.keySecret}
                                                       onChange={(e) => setCashfreeConfig({ ...cashfreeConfig, keySecret: e.target.value })}
                                                       placeholder="••••••••••••••••••••••••"
                                                       className="w-full h-12 bg-bgray-50 dark:bg-darkblack-500 rounded-xl pl-5 pr-12 text-sm font-bold border-none outline-none focus:ring-2 focus:ring-cyan-500/30"
                                                  />
                                                  <button
                                                       type="button"
                                                       onClick={() => setShowCashfreeSecret(!showCashfreeSecret)}
                                                       className="absolute right-4 top-1/2 -translate-y-1/2 text-bgray-400 hover:text-bgray-600 dark:hover:text-white transition-colors"
                                                  >
                                                       {showCashfreeSecret ? (
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                                       ) : (
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                       )}
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              <button
                                   onClick={() => handleSave("cashfree")}
                                   disabled={savingProvider === "cashfree"}
                                   className="mt-8 w-full h-12 bg-cyan-500 text-white font-black rounded-xl hover:bg-cyan-600 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all uppercase tracking-widest text-[10px]"
                              >
                                   {savingProvider === "cashfree" ? "Saving settings..." : "Commit Cashfree Configuration"}
                              </button>
                         </div>
                    </section>
               )}
          </div>
     );
}
