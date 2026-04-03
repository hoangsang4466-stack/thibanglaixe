import React from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { useOrders } from '../../context/OrderContext';

export default function AdminDashboard() {
  const { orders } = useOrders();

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => o.status === 'paid' ? sum + o.amount : sum, 0);
  
  const today = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today).length;
  const todayRevenue = orders
    .filter(o => o.status === 'paid' && new Date(o.createdAt).toDateString() === today)
    .reduce((sum, o) => sum + o.amount, 0);

  // Chart data for last 7 days
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    const count = orders.filter(o => new Date(o.createdAt).toDateString() === d.toDateString()).length;
    return { name: dateStr, count };
  }).reverse();

  const stats = [
    { label: 'Tổng đơn hàng', value: totalOrders, icon: Users, color: 'blue', trend: '+12%' },
    { label: 'Tổng doanh thu', value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue), icon: DollarSign, color: 'emerald', trend: '+8%' },
    { label: 'Đơn hôm nay', value: todayOrders, icon: Calendar, color: 'orange', trend: '+5%' },
    { label: 'Doanh thu hôm nay', value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(todayRevenue), icon: TrendingUp, color: 'purple', trend: '+15%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">Tổng quan hệ thống</h2>
        <p className="text-slate-500">Chào mừng trở lại, Administrator.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${stat.color}-500/10 text-${stat.color}-500`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">
                <ArrowUpRight className="w-3 h-3" /> {stat.trend}
              </div>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-8 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white">Thống kê đơn hàng (7 ngày qua)</h3>
            <select className="bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 px-3 py-1.5 rounded-lg outline-none">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
            </select>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last7Days}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderRadius: '16px', border: '1px solid #1e293b', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[2.5rem]">
          <h3 className="text-lg font-bold text-white mb-8">Đơn hàng gần đây</h3>
          <div className="space-y-6">
            {orders.slice(0, 5).map((order, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-blue-400 font-bold text-xs border border-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {order.fullName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{order.fullName}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{order.licenseType} • {order.province}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{new Intl.NumberFormat('vi-VN').format(order.amount)}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${order.status === 'paid' ? 'text-emerald-500' : 'text-orange-500'}`}>
                    {order.status === 'paid' ? 'Paid' : 'Pending'}
                  </p>
                </div>
              </div>
            ))}
            {orders.length === 0 && <p className="text-center text-slate-500 py-8">Chưa có đơn hàng nào</p>}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-900 text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all border border-slate-800">
            Xem tất cả đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
}
