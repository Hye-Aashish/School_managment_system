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
  const [formData, setFormData] = useState({ email: '', password: '', botCheck: '' });
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid institutional email.");
        return false;
    }
    if (formData.password.length < 6) {
        setError("Password must be at least 6 characters for security.");
        return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Dynamic Validation
    if (!validateForm()) {
        triggerShake();
        return;
    }

    setIsLoading(true);
    
    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success) {
            // Security: Success feedback
            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 800);
        } else {
            setError(data.message || "Authentication failed. Access denied.");
            triggerShake();
            setIsLoading(false);
        }
    } catch (err) {
        setError("System Network Error. Please try again later.");
        triggerShake();
        setIsLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 font-sans selection:bg-emerald-500/20 transition-colors duration-500 overflow-hidden">
      
      {/* Dynamic Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-emerald-500/10 blur-[150px] rounded-full animate-float" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full animate-float" style={{ animationDelay: '-2s' }} />
      </div>

      <div className={`relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-[#0a0a0c] rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/[0.05] overflow-hidden transition-all duration-500 ${shake ? 'animate-shake' : ''}`}>
        
        {/* Left Side: Simple Branding */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-white/[0.03] to-transparent border-r border-white-[0.05]">
            <div className="relative">
                <div className="flex items-center gap-4 mb-16 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-tr from-primary to-emerald-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <span className="text-[#020617] font-black text-2xl">S</span>
                    </div>
                    <span className="font-black text-2xl tracking-tighter">SchoolSys</span>
                </div>
                
                <h1 className="text-5xl font-black tracking-tighter leading-[1.05] mb-8">
                    Best School <br />
                    Management <br />
                    <span className="text-primary italic">System.</span>
                </h1>
                <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-sm">
                    Manage your school's attendance, fees, and students very easily in one place.
                </p>
            </div>

            <div className="space-y-6">
                {[
                    { icon: faCheckCircle, text: "Smart Student Reports", color: "text-primary" },
                    { icon: faShieldAlt, text: "100% Safe & Secure", color: "text-blue-400" }
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                        <div className={`w-10 h-10 rounded-2xl bg-white/[0.03] flex items-center justify-center ${item.color}`}>
                            <FontAwesomeIcon icon={item.icon} className="text-sm" />
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-300">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Right Side: Simple Login Form */}
        <div className="p-12 md:p-16 flex flex-col justify-center bg-[#0a0a0c]">
            
            <div className="mb-12">
                <h2 className="text-3xl font-black tracking-tighter mb-2">Welcome Back</h2>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Please login to your account</p>
                </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-7">
                
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-[#020617] shrink-0">
                            <FontAwesomeIcon icon={faShieldAlt} className="text-xs" />
                        </div>
                        <p className="text-xs font-bold text-red-500 leading-tight">{error}</p>
                    </div>
                )}

                {/* Honeypot field */}
                <input 
                    type="text" 
                    name="botCheck" 
                    value={formData.botCheck} 
                    onChange={e => setFormData({...formData, botCheck: e.target.value})} 
                    className="hidden" 
                    tabIndex={-1} 
                    autoComplete="off" 
                />

                <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative group">
                        <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="your@email.com"
                            className="w-full bg-[#030712] border border-white/[0.05] rounded-2xl h-14 px-6 pr-14 text-sm font-bold focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
                        <button type="button" className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">Forgot?</button>
                    </div>
                    <div className="relative group">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder="Enter Password"
                            className="w-full bg-[#030712] border border-white/[0.05] rounded-2xl h-14 px-6 pr-14 text-sm font-bold focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-xs" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input type="checkbox" className="peer appearance-none w-5 h-5 rounded-lg border border-white/[0.1] bg-[#030712] checked:bg-primary checked:border-primary transition-all cursor-pointer" />
                            <FontAwesomeIcon icon={faCheckCircle} className="absolute left-1 text-[10px] text-[#020617] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Remember me</span>
                    </label>
                </div>

                <div className="pt-6">
                    <button 
                        disabled={isLoading}
                        className="w-full h-15 bg-primary hover:bg-emerald-400 disabled:bg-gray-800 disabled:opacity-50 text-[#020617] font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-[0_20px_40px_rgba(16,185,129,0.1)] transition-all flex items-center justify-center gap-4 active:scale-[0.98] group"
                    >
                        {isLoading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-lg" />
                                <span>Logging in...</span>
                            </>
                        ) : (
                            <>
                                Login Now
                                <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="mt-16 text-center">
                 <p className="text-[9px] text-gray-600 font-bold tracking-[0.3em] uppercase">&copy; 2026 Admin Dashboard v4.0</p>
            </div>
        </div>
      </div>
    </main>
  );
}
