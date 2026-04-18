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
        <p className="text-[10px] font-bold text-gray-500 italic">{subtitle}</p>
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
      
      {/* Dynamic Mesh Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-20 z-0">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-emerald-400/20 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-400/20 blur-[150px] rounded-full delay-700 animate-pulse" />
      </div>

      {/* Synchronized Error Alert */}
      {error && (
          <div className="relative z-50 animate-in slide-in-from-top-4 duration-500">
               <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-xl p-4 rounded-2xl flex items-center gap-4 shadow-2xl shadow-red-500/10">
                    <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white shrink-0">
                         <FontAwesomeIcon icon={faExclamationTriangle} />
                    </div>
                    <div>
                         <p className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-none">Connection Error</p>
                         <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mt-1">{error}</p>
                    </div>
                    <button onClick={() => window.location.reload()} className="ml-auto bg-red-500 px-6 py-2 rounded-xl text-[10px] font-black text-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"> Retry </button>
               </div>
          </div>
      )}

      {/* Hero Welcome Banner */}
      <div className="relative z-10 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-[40px] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[38px] p-8 md:p-12 overflow-hidden shadow-2xl">
              {/* Abstract Patterns */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full -ml-32 -mb-32" />
              
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center relative z-10">
                  <div className="xl:col-span-8 space-y-6">
                      <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                          <FontAwesomeIcon icon={faShieldHalved} className="text-emerald-400 text-xs" />
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Admin Dashboard Live</span>
                      </div>
                      <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1]">
                          School Management <br />
                          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent italic font-serif">Dashboard.</span>
                      </h1>
                      <p className="text-slate-400 text-lg font-medium max-w-2xl leading-relaxed">
                          Your school metrics are looking good. Total revenue has increased by <span className="text-emerald-400 font-bold">14.2%</span> and admissions are growing.
                      </p>
                      <div className="flex flex-wrap items-center gap-6 pt-4">
                          <button className="bg-[#10b981] hover:bg-emerald-400 text-black px-10 py-4 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_10px_40px_rgba(16,185,129,0.4)] border-2 border-emerald-300"> View Report </button>
                          <button className="bg-white hover:bg-white text-black px-10 py-4 rounded-2xl font-black text-sm transition-all shadow-xl"> Recent Activity </button>
                      </div>
                  </div>
                  <div className="xl:col-span-4 hidden xl:grid grid-cols-2 gap-4">
                      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 text-center flex flex-col justify-center transform hover:-translate-y-2 transition-transform duration-500">
                           <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-2">Health Score</p>
                           <h4 className="text-4xl font-black text-white">A+</h4>
                      </div>
                      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 text-center flex flex-col justify-center transform hover:-translate-y-2 transition-transform duration-500 delay-100">
                           <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Online Rate</p>
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

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {loading ? (
            <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
            </>
        ) : (
            <>
                <StatCard title="Total Students" value={stats.totalStudents} icon={faUserGraduate} color="primary" trend="up" trendValue="5.2" subtitle="Across all primary & secondary wings" />
                <StatCard title="Total Revenue" value={`₹${(stats.totalRevenue || 0).toLocaleString()}`} icon={faWallet} color="blue" trend="up" trendValue="12.4" subtitle="Year-to-date collected fees" />
                <StatCard title="Pending Applications" value={stats.onlineAdmissions} icon={faUsers} color="orange" trend="down" trendValue="1.8" subtitle="Processing time: 2.4 days" />
                <StatCard title="Academic Schedule" value={(stats.upcomingEvents > 0 ? `${stats.upcomingEvents} Events` : "No Events")} icon={faCalendarCheck} color="purple" trend="up" trendValue={stats.upcomingEvents} subtitle="Upcoming institutional activities" />
            </>
        )}
      </div>

      {/* Analytical Layout */}
      <div className="grid grid-cols-1 2xl:grid-cols-12 gap-10 relative z-10">
        
        {/* Financial Center */}
        <div className="2xl:col-span-8 flex flex-col gap-10">
          {loading ? <ChartSkeleton /> : (
            <div className="card-modern p-10 bg-white dark:bg-darkblack-600 border-none shadow-xl shadow-black/5 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] -mr-16 -mt-16 rounded-full" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h3 className="text-2xl font-black text-bgray-900 dark:text-white flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-sm">
                            <FontAwesomeIcon icon={faChartLine} />
                        </div>
                        Fee Revenue
                    </h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Income & Expense Analysis</p>
                </div>
                <div className="flex items-center gap-3 p-1 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                    {['Quarterly', 'Monthly', 'Daily'].map((t, i) => (
                        <button key={i} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${i === 1 ? 'bg-white dark:bg-darkblack-500 shadow-md text-black' : 'text-gray-500 hover:text-bgray-900 dark:hover:text-white'}`}>
                            {t}
                        </button>
                    ))}
                </div>
                </div>
                <div className="h-[400px]">
                    <RevenueFlowChart />
                </div>
            </div>
          )}

          {/* Admission Registry */}
          <div className="card-modern bg-white dark:bg-darkblack-600 border-none shadow-xl shadow-black/5">
            <div className="p-10 border-b border-gray-50 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-black text-bgray-900 dark:text-white flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-sm">
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                    </div>
                    Recent Students
                </h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Latest student admissions</p>
              </div>
              <div className="flex items-center gap-3">
                  <div className="flex -space-x-3 pr-4">
                      {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-darkblack-600 bg-gray-100 dark:bg-darkblack-500 overflow-hidden text-[10px] flex items-center justify-center font-black"> {i} </div>)}
                  </div>
                   <button className="bg-primary text-black px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20">View All</button>
              </div>
            </div>
            
            <div className="p-4 md:p-10 pt-0 overflow-x-auto">
               {loading ? <TableSkeleton rows={5} /> : (
                <table className="w-full table-modern text-left">
                    <thead>
                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 dark:border-white/5">
                        <th className="py-6 px-1">ID-REF</th>
                        <th className="py-6 px-4">Student Profile</th>
                        <th className="py-6 px-2">Academic Level</th>
                        <th className="py-6 px-2">Parent Guardian</th>
                        <th className="py-6 px-2 text-right">Status</th>
                    </tr>
                    </thead>
                    <tbody className="text-sm">
                    {recentStudents.length === 0 ? (
                        <tr><td colSpan={5} className="py-20 text-center text-gray-400 font-bold italic">No recent students found.</td></tr>
                    ) : recentStudents.map((student: any, idx: number) => (
                        <tr key={idx} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all cursor-pointer">
                        <td className="py-6 px-1">
                            <span className="text-xs font-black text-primary bg-primary/10 px-2 py-1 rounded-md">#{student.admission_no}</span>
                        </td>
                        <td className="py-6 px-4">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/10 flex items-center justify-center border border-white/5 font-black text-xs group-hover:scale-110 transition-transform shadow-sm">
                                    {student.fname[0]}{student.lname?.[0]}
                                </div>
                                <div>
                                    <p className="font-black text-bgray-900 dark:text-white leading-tight mb-1">{student.fname} {student.lname}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Enrolled: {new Date(student.created_at || student.admission_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </td>
                        <td className="py-6 px-2">
                            <div className="flex flex-col">
                                <span className="text-xs font-black text-bgray-700 dark:text-gray-300">Grade {student.class}</span>
                                <span className="text-[10px] font-bold text-gray-400">R-Section {student.section}</span>
                            </div>
                        </td>
                        <td className="py-6 px-2">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-bgray-600 dark:text-gray-400 italic">Mr. {student.father_name}</span>
                            </div>
                        </td>
                        <td className="py-6 px-2 text-right">
                            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-400/10 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-400/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Confirmed
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
               )}
            </div>
          </div>
        </div>


        {/* Intelligence Sidebar */}
        <div className="2xl:col-span-4 flex flex-col gap-10">
            <div className="card-modern p-10 bg-white dark:bg-darkblack-600 border-none shadow-xl shadow-black/5 overflow-hidden relative">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-black text-bgray-900 dark:text-white flex items-center justify-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-sm">
                            <FontAwesomeIcon icon={faChartPie} />
                        </div>
                        Student Categories
                    </h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-3">Distribution by grade level</p>
                </div>
                
                <div className="relative h-[240px] flex items-center justify-center mb-8">
                    <div className="absolute inset-0 z-0 bg-gradient-to-tr from-gray-50/50 to-transparent dark:from-white/5 rounded-full blur-2xl" />
                    <div className="w-full h-full relative z-10 transition-transform duration-700 cursor-pointer">
                        <PieChart />
                    </div>
                </div>

                <div className="mt-8 space-y-3">
                    {[
                        { label: 'Primary Wing', val: 42, color: 'emerald', detail: 'Classes I to V' },
                        { label: 'Middle Wing', val: 28, color: 'blue', detail: 'Classes VI to VIII' },
                        { label: 'Higher Wing', val: 30, color: 'orange', detail: 'Classes IX to XII' }
                    ].map((item, i) => (
                        <div key={i} className="group p-5 rounded-[24px] bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-blue-500/30 hover:bg-white dark:hover:bg-darkblack-500 transition-all duration-300">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3.5 h-3.5 rounded-full bg-${item.color}-500 shadow-[0_0_15px_rgba(var(--primary-glow))] group-hover:scale-125 transition-transform`} />
                                    <span className="text-xs font-black text-bgray-900 dark:text-white">{item.label}</span>
                                </div>
                                <span className="text-sm font-black text-primary italic">{item.val}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                                <div className={`h-full bg-${item.color}-500 transition-all duration-1000 delay-300`} style={{ width: `${item.val}%` }} />
                            </div>
                            <p className="text-[10px] font-bold text-gray-500 mt-2">Current Capacity Partition: {item.detail}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Metrics Overlay */}
            <div className="bg-gradient-to-br from-[#0f172a] to-primary p-1 rounded-[40px] shadow-2xl overflow-hidden group">
                <div className="bg-white dark:bg-darkblack-600 rounded-[38px] p-10 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px]" />
                    <h4 className="text-xl font-black mb-6 text-bgray-900 dark:text-white">Quick Insights</h4>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-50 dark:border-white/5 pb-4">
                            <span className="text-xs font-bold text-gray-500">Global Attendance</span>
                            <span className="text-sm font-black text-emerald-500">94.8%</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-50 dark:border-white/5 pb-4">
                            <span className="text-xs font-bold text-gray-500">Faculty Punctuality</span>
                            <span className="text-sm font-black text-blue-500">98.2%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-500">Server Latency</span>
                            <span className="text-sm font-black text-orange-500">42ms</span>
                        </div>
                    <button className="w-full mt-10 bg-gradient-to-r from-primary to-emerald-500 text-black rounded-2xl py-4 font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                        View Logs
                    </button>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}
