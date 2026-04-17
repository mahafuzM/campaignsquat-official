import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";
import { 
  Users, TrendingUp, Activity, Briefcase, Eye, Globe, ChevronRight, FileText, Package
} from "lucide-react";
import axios from "../../axiosConfig";

// Static mock data for charts (Analytics backend required for fully dynamic graph data)
const trafficData = [
  { name: 'Mon', visitors: 4000, pageviews: 2400 },
  { name: 'Tue', visitors: 3000, pageviews: 1398 },
  { name: 'Wed', visitors: 2000, pageviews: 9800 },
  { name: 'Thu', visitors: 2780, pageviews: 3908 },
  { name: 'Fri', visitors: 1890, pageviews: 4800 },
  { name: 'Sat', visitors: 2390, pageviews: 3800 },
  { name: 'Sun', visitors: 3490, pageviews: 4300 },
];

const performanceData = [
  { name: 'Week 1', completion: 400, target: 240 },
  { name: 'Week 2', completion: 300, target: 139 },
  { name: 'Week 3', completion: 200, target: 980 },
  { name: 'Week 4', completion: 278, target: 390 },
];

const OverviewDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: '--',
    totalBlogs: '--',
    totalJobApps: '--',
    totalProducts: '--',
    totalFaqs: '--'
  });

  // Fetch true dynamic entity counts from the backend via the configured axios instance
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, blogRes, appRes, prodRes, faqRes] = await Promise.allSettled([
          axios.get("/api/projects"),
          axios.get("/api/blogs"),
          axios.get("/api/applications"), 
          axios.get("/api/products"),
          axios.get("/api/faqs")
        ]);

        setStats({
          totalProjects: projRes.status === 'fulfilled' ? projRes.value.data.length || 0 : 0,
          totalBlogs: blogRes.status === 'fulfilled' ? blogRes.value.data.length || 0 : 0,
          totalJobApps: appRes.status === 'fulfilled' ? appRes.value.data.length || 0 : 0,
          totalProducts: prodRes.status === 'fulfilled' ? prodRes.value.data.length || 0 : 0,
          totalFaqs: faqRes.status === 'fulfilled' ? faqRes.value.data.length || 0 : 0
        });
      } catch (e) {
        console.error("Stats fetching error", e);
      }
    };
    fetchStats();
  }, []);

  const KpiCard = ({ title, value, icon: Icon, trend, trendUp }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-[13px] font-semibold text-gray-500 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <div className={`flex items-center gap-1 mt-2 text-[12px] font-medium ${trendUp ? 'text-green-600' : 'text-[#F7A400]'}`}>
          {trendUp ? <TrendingUp size={14} /> : <Activity size={14} />}
          <span>{trend} from last month</span>
        </div>
      </div>
      <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
        <Icon size={24} className="text-[#F7A400]" />
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time performance metrics and entity counts.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <Link to="/admin/gtm-management" className="text-sm font-medium px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-gray-700 flex items-center gap-2">
            <Globe size={16} className="text-[#F7A400]" />
            GTM Status
          </Link>
          <button className="text-sm font-medium px-4 py-2 bg-[#F7A400] text-black rounded-lg hover:bg-[#d68500] transition-colors shadow-md shadow-[#F7A400]/20 flex items-center gap-2">
            <Activity size={16} />
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard title="Total Projects" value={stats.totalProjects} icon={Briefcase} trend="Total" trendUp={true} />
        <KpiCard title="Job Applications" value={stats.totalJobApps} icon={Users} trend="Active" trendUp={true} />
        <KpiCard title="Active Blogs" value={stats.totalBlogs} icon={FileText} trend="Total" trendUp={true} />
        <KpiCard title="Total Products" value={stats.totalProducts} icon={Package} trend="Live" trendUp={true} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Main Chart: Traffic Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Traffic & Engagement</h3>
              <p className="text-xs text-gray-500 mt-0.5">Weekly visitors vs pageviews mapping</p>
            </div>
            <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-gray-50 outline-none focus:border-[#F7A400]">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F7A400" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F7A400" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: '500' }}
                />
                <Area type="monotone" dataKey="pageviews" stroke="#000" strokeWidth={2} fillOpacity={1} fill="url(#colorPageviews)" />
                <Area type="monotone" dataKey="visitors" stroke="#F7A400" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart: Target vs Completion */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">Conversion Goals</h3>
          <p className="text-xs text-gray-500 mb-6">Leads vs Target Metrics</p>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                <RechartsTooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="completion" fill="#F7A400" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Action Call */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/admin/seo-management" className="flex items-center justify-between text-sm text-gray-600 hover:text-[#F7A400] transition-colors font-medium">
              <span>View detailed SEO reports</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default OverviewDashboard;
