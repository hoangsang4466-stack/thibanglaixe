import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Download, 
  TrendingUp,
  MapPin,
  IdCard,
  Phone,
  Mail,
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Home as HomeIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import * as XLSX from 'xlsx';
import { useOrders } from '../context/OrderContext';
import { Order, OrderStatus } from '../types';
import { PROVINCES, LICENSE_NAMES } from '../constants';
import { toast } from 'react-hot-toast';

export default function Admin() {
  const { orders, updateOrder, deleteOrder } = useOrders();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvince, setFilterProvince] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = filterProvince === 'All' || order.province === filterProvince;
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesProvince && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, order) => order.status === 'paid' ? sum + order.amount : sum, 0);
  const totalOrders = orders.length;
  const paidOrders = orders.filter(o => o.status === 'paid').length;

  const chartData = [
    { name: 'A1', count: orders.filter(o => o.licenseType === 'A1').length },
    { name: 'B1', count: orders.filter(o => o.licenseType === 'B1').length },
    { name: 'B2', count: orders.filter(o => o.licenseType === 'B2').length },
    { name: 'C', count: orders.filter(o => o.licenseType === 'C').length },
  ];

  const statusData = [
    { name: 'Đã thanh toán', value: paidOrders, color: '#10b981' },
    { name: 'Chờ thanh toán', value: totalOrders - paidOrders, color: '#f59e0b' },
  ];

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    try {
      updateOrder(id, { status });
      toast.success('Cập nhật trạng thái thành công!');
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá đơn hàng này?')) return;
    try {
      deleteOrder(id);
      toast.success('Đã xoá đơn hàng!');
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    }
  };

  const exportToExcel = () => {
    const data = filteredOrders.map(o => ({
      'Mã đơn': o.id,
      'Họ tên': o.fullName,
      'SĐT': o.phone,
      'CCCD': o.idNumber,
      'Email': o.email,
      'Tỉnh': o.province,
      'Sân thi': o.venue,
      'Loại bằng': o.licenseType,
      'Ngày thi': o.examDate,
      'Số tiền': o.amount,
      'Trạng thái': o.status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán',
      'Ngày tạo': o.createdAt instanceof Date ? o.createdAt.toLocaleString() : o.createdAt
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    XLSX.writeFile(wb, `GPLX_Orders_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
              title="Về trang chủ"
            >
              <HomeIcon className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hệ thống quản trị</h1>
              <p className="text-slate-500">Quản lý hồ sơ đăng ký thi bằng lái xe toàn quốc</p>
            </div>
          </div>
          <button 
            onClick={exportToExcel}
            className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-xl shadow-emerald-200"
          >
            <Download className="w-5 h-5" /> Xuất Excel
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tổng hồ sơ</p>
              <p className="text-3xl font-black text-slate-900">{totalOrders}</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <DollarSign className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Doanh thu</p>
              <p className="text-3xl font-black text-slate-900">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tỉ lệ thanh toán</p>
              <p className="text-3xl font-black text-slate-900">{totalOrders ? Math.round((paidOrders / totalOrders) * 100) : 0}%</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-8">Phân bổ loại bằng</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-8">Trạng thái thanh toán</h3>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-4 pr-8">
                {statusData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm font-medium text-slate-600">{entry.name}: <b>{entry.value}</b></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h3 className="text-lg font-bold">Danh sách đơn hàng</h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Tìm tên, SĐT, mã đơn..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                value={filterProvince}
                onChange={e => setFilterProvince(e.target.value)}
              >
                <option value="All">Tất cả tỉnh</option>
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <select 
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
              >
                <option value="All">Tất cả trạng thái</option>
                <option value="pending">Chờ thanh toán</option>
                <option value="paid">Đã thanh toán</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-4">Mã đơn / Ngày tạo</th>
                  <th className="px-8 py-4">Học viên</th>
                  <th className="px-8 py-4">Loại bằng / Tỉnh</th>
                  <th className="px-8 py-4">Trạng thái</th>
                  <th className="px-8 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan={5} className="px-8 py-12 text-center text-slate-400">Đang tải dữ liệu...</td></tr>
                ) : paginatedOrders.length === 0 ? (
                  <tr><td colSpan={5} className="px-8 py-12 text-center text-slate-400">Không tìm thấy đơn hàng nào</td></tr>
                ) : paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-900">{order.id}</p>
                      <p className="text-xs text-slate-400">
                        {order.createdAt instanceof Date ? order.createdAt.toLocaleString() : 'N/A'}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                          {order.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{order.fullName}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-1"><Phone className="w-3 h-3" /> {order.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest mr-2">
                        {order.licenseType}
                      </span>
                      <span className="text-sm text-slate-600">{order.province}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                        {order.status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {order.status === 'pending' && (
                          <button 
                            onClick={() => handleUpdateStatus(order.id, 'paid')}
                            className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100"
                            title="Xác nhận thanh toán"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(order.id)}
                          className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100"
                          title="Xoá đơn"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Hiển thị <b>{(currentPage - 1) * itemsPerPage + 1}</b> - <b>{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</b> trong tổng số <b>{filteredOrders.length}</b>
            </p>
            <div className="flex items-center gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
