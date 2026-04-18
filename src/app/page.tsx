"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faEye, faEyeSlash, faCheckCircle, faUser,
    faEnvelope, faLock, faArrowRight, faSpinner, faShieldAlt
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Smooth login delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (formData.email && formData.password) {
        router.push("/admin/dashboard");
    } else {
        setError("Login failed. Please check your email and password.");
        setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 font-sans selection:bg-emerald-500/10 transition-colors duration-500">
      
      {/* Background colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-darkblack-600 rounded-[32px] shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-500">
        
        {/* Left Side: Welcome Info */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-bgray-50 dark:bg-darkblack-500 border-r border-gray-100 dark:border-white/5">
            <div>
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="font-bold text-xl text-bgray-900 dark:text-white">SchoolSys</span>
                </div>
                
                <h1 className="text-4xl font-bold text-bgray-900 dark:text-white tracking-tight leading-tight mb-5">
                    Managing your school <br />
                    is now <span className="text-emerald-500">very easy.</span>
                </h1>
                <p className="text-bgray-500 text-lg">
                    A simple way to track attendance, fees, and more.
                </p>
            </div>

            <div className="space-y-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-sm" />
                    </div>
                    <p className="text-sm font-semibold text-bgray-700 dark:text-bgray-200">Easy to use Dashboards</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-sm" />
                    </div>
                    <p className="text-sm font-semibold text-bgray-700 dark:text-bgray-200">Secure & Safe Data</p>
                </div>
            </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-10 md:p-14 flex flex-col justify-center bg-white dark:bg-darkblack-600">
            
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-bgray-900 dark:text-white mb-2">Welcome Back</h2>
                <p className="text-bgray-400 text-sm">Please log in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                
                {error && (
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-4 rounded-xl flex items-center gap-3">
                        <p className="text-xs font-bold text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-xs font-bold text-bgray-500 ml-1">Email Address</label>
                    <div className="relative">
                        <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="your@email.com"
                            className="w-full bg-bgray-50 dark:bg-darkblack-500 border border-bgray-200 dark:border-white/5 rounded-xl h-12 px-5 text-bgray-900 dark:text-white text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-darkblack-400 focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans"
                        />
                        <FontAwesomeIcon icon={faEnvelope} className="absolute right-5 top-1/2 -translate-y-1/2 text-bgray-300 dark:text-bgray-600" />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-bgray-500 ml-1">Password</label>
                        <button type="button" className="text-xs font-bold text-emerald-500 hover:underline">Forgot password?</button>
                    </div>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder="Enter password"
                            className="w-full bg-bgray-50 dark:bg-darkblack-500 border border-bgray-200 dark:border-white/5 rounded-xl h-12 px-5 text-bgray-900 dark:text-white text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-darkblack-400 focus:ring-4 focus:ring-emerald-500/10 transition-all font-sans"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-bgray-300 dark:text-bgray-600 hover:text-emerald-500"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-xs" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-bgray-300 dark:border-darkblack-400 text-emerald-500 focus:ring-emerald-500 bg-white dark:bg-darkblack-500" />
                        <span className="text-xs font-semibold text-bgray-500">Remember me</span>
                    </label>
                </div>

                <div className="pt-4">
                    <button 
                        disabled={isLoading}
                        className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 disabled:bg-bgray-200 text-black font-black uppercase tracking-widest text-[11px] rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                        {isLoading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin />
                                AUTHENTICATING...
                            </>
                        ) : (
                            <>
                                SIGN IN SECURELY
                                <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="mt-10 text-center">
                 <p className="text-[10px] text-bgray-400 font-medium tracking-widest uppercase">&copy; 2026 FUTURE IT TOUCH PVT. LTD.</p>
            </div>
        </div>
      </div>
    </main>
  );
}
