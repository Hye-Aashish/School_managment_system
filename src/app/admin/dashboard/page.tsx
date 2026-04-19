'use client';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLayoutGrid, faUserShield, faChartPie, faExclamationTriangle, faArrowTrendUp, faArrowTrendDown,
  faUsers, faDollarSign, faCalendarCheck, faGlobe, faEnvelope, faBell, faUserGraduate, faWallet,
  faShieldHalved, faArrowUp, faArrowDown, faCircleCheck, faChartLine, faClockRotateLeft
} from "@fortawesome/free-solid-svg-icons";
import RevenueFlowChart from "../../graphs/RevenueFlowChart";
import PieChart from "../../graphs/PieChart";
import { StatCardSkeleton, TableSkeleton, ChartSkeleton } from "@/app/common/Skeleton";

const StatCard = ({ title, value, icon, color, trend, trendValue, subtitle }: any) => {
  const colorMap: any = {
    primary: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600',
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-600',
    orange: 'from-orange-500/20 to-orange-500/5 text-orange-600',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-600'
  };

  return (
    <div className="card-modern group relative p-6 overflow-hidden border-none bg-white dark:bg-darkblack-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)] transition-all duration-500">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorMap[color]} blur-3xl -mr-12 -mt-12 opacity-50 group-hover:opacity-100 transition-opacity`} />
      
      <div className="flex items-start justify-between relative z-10">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
          <FontAwesomeIcon icon={icon} className="text-2xl" />
        </div>
        <div className="flex flex-col items-end">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                ${trend === 'up' ? 'bg-emerald-100 text-black' : 'bg-rose-100 text-black'}
            `}>
                <FontAwesomeIcon icon={trend === 'up' ? faArrowUp : faArrowDown} />
                {trendValue}%
            </div>
        </div>
      </div>

      <div className="mt-6 relative z-10">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</p>
        <h3 className="text-3xl font-black text-bgray-900 dark:text-white tracking-tighter leading-none mb-2">{value}</h3>
        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 italic">{subtitle}</p>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-100 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    disabledStudents: 0,
    onlineAdmissions: 0,
    totalRevenue: 0,
    upcomingEvents: 0
  });
  const [recentStudents, setRecentStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [statsRes, studentsRes] = await Promise.all([
          fetch("/api/stats"),
          fetch("/api/stats/recent-students")
        ]);

        if (!statsRes.ok || !studentsRes.ok) {
            throw new Error("Failed to load school statistics.");
        }

        const statsDataJson = await statsRes.json();
        const statsData = statsDataJson.data || {};
        const studentsData = await studentsRes.json();

        setStats({
              totalStudents: statsData.totalStudents || 0,
              activeStudents: statsData.activeStudents || 0,
              disabledStudents: statsData.disabledStudents || 0,
              onlineAdmissions: statsData.onlineAdmissions || 0,
              totalRevenue: statsData.totalIncome || 0,
              upcomingEvents: statsData.upcomingEvents || 0
        });

        setRecentStudents(studentsData.data || []);
      } catch (err: any) {
        console.error("Dashboard synchronization failure:", err);
        setError(err.message || "An error occurred while loading data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-10 pb-20">
      
      {/* Mesh Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-20 z-0">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-emerald-400/20 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-400/20 blur-[150px] rounded-full animate-pulse" />
      </div>

      {error && (
          <div className="relative z-50">
               <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-xl p-4 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white shrink-0">
                         <FontAwesomeIcon icon={faExclamationTriangle} />
                    </div>
                    <div>
                         <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Connection Error</p>
                         <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mt-1">{error}</p>
                    </div>
                    <button onClick={() => window.location.reload()} className="ml-auto bg-red-500 px-6 py-2 rounded-xl text-[10px] font-black text-black"> Retry </button>
               </div>
          </div>
      )}

      {/* Hero Section */}
      <div className="relative z-10 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-[40px] blur opacity-20"></div>
          <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[38px] p-8 md:p-12 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center relative z-10">
                  <div className="xl:col-span-8 space-y-6">
                      <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                          <FontAwesomeIcon icon={faShieldHalved} className="text-emerald-400 text-xs" />
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Admin Dashboard Live</span>
                      </div>
                      <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1]">
                          School Management <br />
                          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent italic">Dashboard.</span>
                      </h1>
                      <p className="text-slate-300 text-lg font-medium max-w-2xl leading-relaxed">
                          Your school details are updated. Total income is tracked live and new student admissions are growing.
                      </p>
                      <div className="flex flex-wrap items-center gap-6 pt-4">
                          <button className="bg-emerald-500 text-black px-10 py-4 rounded-2xl font-black text-sm transition-all hover:scale-105 border-2 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]"> View Report </button>
                          <button className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-2xl font-black text-sm transition-all backdrop-blur-md border border-white/20 shadow-xl"> Recent Activity </button>
                      </div>
                  </div>
                  <div className="xl:col-span-4 hidden xl:grid grid-cols-2 gap-4">
                      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 text-center flex flex-col justify-center transform hover:-translate-y-2 transition-all">
                           <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-2">Overall Grade</p>
                           <h4 className="text-4xl font-black text-white">A+</h4>
                      </div>
                      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 text-center flex flex-col justify-center transform hover:-translate-y-2 transition-all">
                           <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Attendance Rate</p>
                           <h4 className="text-4xl font-black text-white">92%</h4>
                      </div>
                      <div className="col-span-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-xl p-6 rounded-[32px] border border-white/10 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white scale-75 animate-pulse">
                                   <FontAwesomeIcon icon={faCircleCheck} />
                               </div>
                               <div>
                                   <p className="text-[10px] font-black text-white uppercase tracking-wider">System Status</p>
                                   <p className="text-xs text-white/60 font-medium">Online & Synced</p>
                               </div>
                           </div>
                           <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-lg">LIVE</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {loading ? (
            <><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /></>
        ) : (
            <>
                <StatCard title="Total Students" value={stats.totalStudents} icon={faUserGraduate} color="primary" trend="up" trendValue="5.2" subtitle="All wings" />
                <StatCard title="Total Income" value={`₹${(stats.totalRevenue || 0).toLocaleString()}`} icon={faWallet} color="blue" trend="up" trendValue="12.4" subtitle="Collected fees" />
                <StatCard title="New Admissions" value={stats.onlineAdmissions} icon={faUsers} color="orange" trend="down" trendValue="1.8" subtitle="Pending processing" />
                <StatCard title="Schedule" value={(stats.upcomingEvents > 0 ? `${stats.upcomingEvents} Events` : "No Events")} icon={faCalendarCheck} color="purple" trend="up" trendValue={stats.upcomingEvents} subtitle="Upcoming activities" />
            </>
        )}
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-10 relative z-10">
        {/* Left Content */}
        <div className="2xl:col-span-8 space-y-10">
          {loading ? <ChartSkeleton /> : (
            <div className="card-modern p-10 bg-white dark:bg-darkblack-600 rounded-3xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div>
                    <h3 className="text-2xl font-black text-bgray-900 dark:text-white flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-sm">
                            <FontAwesomeIcon icon={faChartLine} />
                        </div>
                        Income Overview
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 p-1 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                    {['Yearly', 'Monthly', 'Daily'].map((t, i) => (
                        <button key={i} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${i === 1 ? 'bg-white dark:bg-darkblack-500 text-black dark:text-white' : 'text-gray-500'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="h-[400px]"><RevenueFlowChart /></div>
            </div>
          )}

          {/* Table */}
          <div className="card-modern bg-white dark:bg-darkblack-600 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-10 border-b dark:border-white/5">
                <h3 className="text-2xl font-black text-bgray-900 dark:text-white flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-sm">
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                    </div>
                    New Students
                </h3>
            </div>
            <div className="p-10 overflow-x-auto">
               {loading ? <TableSkeleton rows={5} /> : (
                <table className="w-full text-left">
                    <thead>
                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b dark:border-white/10">
                        <th className="py-6 px-1">ID</th>
                        <th className="py-6 px-4">Profile</th>
                        <th className="py-6 px-2">Level</th>
                        <th className="py-6 px-2 text-right">Status</th>
                    </tr>
                    </thead>
                    <tbody className="text-sm">
                    {recentStudents.map((student: any, idx: number) => (
                        <tr key={idx} className="border-b dark:border-white/5">
                        <td className="py-6">#{student.admission_no}</td>
                        <td className="py-6 px-4 font-black">{student.fname} {student.lname}</td>
                        <td className="py-6 px-2">Grade {student.class}</td>
                        <td className="py-6 px-2 text-right">
                            <span className="bg-emerald-400/10 text-emerald-400 px-3 py-1 rounded-lg text-[10px] font-black tracking-widest">CONFIRMED</span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
               )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="2xl:col-span-4 space-y-10">
            <div className="card-modern p-10 bg-white dark:bg-darkblack-600 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-black text-bgray-900 dark:text-white mb-8 text-center">Category</h3>
                <div className="h-[240px] flex items-center justify-center mb-8"><PieChart /></div>
                <div className="space-y-4">
                    {[
                        { label: 'Primary', val: 42, color: 'emerald' },
                        { label: 'Middle', val: 28, color: 'blue' },
                        { label: 'Higher', val: 30, color: 'orange' }
                    ].map((item, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-black">{item.label}</span>
                                <span className="text-sm font-black text-primary">{item.val}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-white/10 h-1.5 rounded-full">
                                <div className={`h-full bg-${item.color}-500`} style={{ width: `${item.val}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-br from-[#0f172a] to-emerald-600 p-8 rounded-3xl text-white shadow-2xl">
                <h4 className="text-xl font-black mb-6">Quick Info</h4>
                <div className="space-y-4">
                    <div className="flex justify-between border-b border-white/10 pb-4">
                        <span className="text-xs opacity-60">Status</span>
                        <span className="text-sm font-black">Online</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-4">
                        <span className="text-xs opacity-60">Speed</span>
                        <span className="text-sm font-black">42ms</span>
                    </div>
                </div>
                <button className="w-full mt-8 bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest">VIEW ALL</button>
            </div>
        </div>
      </div>
    </div>
  );
}
