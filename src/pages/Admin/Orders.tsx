import React, { useState } from 'react';
import { 
  Search, 
  Trash2, 
  CheckCircle2, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Filter,
  Printer
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { useOrders } from '../../context/OrderContext';
import { useConfig } from '../../context/ConfigContext';
import { OrderStatus } from '../../types';
import { toast } from 'react-hot-toast';

export default function AdminOrders() {
  const { orders, updateOrder, deleteOrder } = useOrders();
  const { provinces } = useConfig();
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

  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePrint = (order: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <html>
        <head>
          <title>Hồ sơ đăng ký - ${order.fullName}</title>
          <style>
            body { font-family: 'Arial', sans-serif; padding: 40px; color: #333; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; text-transform: uppercase; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; width: 200px; display: inline-block; }
            .value { display: inline-block; }
            .footer { margin-top: 50px; text-align: right; }
            .signature { margin-top: 80px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">ĐƠN ĐỀ NGHỊ HỌC, SÁT HẠCH ĐỂ CẤP GIẤY PHÉP LÁI XE</div>
            <p>Mã hồ sơ: ${order.id}</p>
          </div>
          <div class="section">
            <p><span class="label">Họ và tên:</span> <span class="value">${order.fullName.toUpperCase()}</span></p>
            <p><span class="label">Số điện thoại:</span> <span class="value">${order.phone}</span></p>
            <p><span class="label">Số CCCD/CMND:</span> <span class="value">${order.idNumber}</span></p>
            <p><span class="label">Email:</span> <span class="value">${order.email || 'N/A'}</span></p>
            <p><span class="label">Tỉnh/Thành phố:</span> <span class="value">${order.province}</span></p>
            <p><span class="label">Sân thi dự kiến:</span> <span class="value">${order.venue}</span></p>
            <p><span class="label">Hạng bằng lái xe:</span> <span class="value">${order.licenseType}</span></p>
            <p><span class="label">Ngày thi dự kiến:</span> <span class="value">${order.examDate}</span></p>
          </div>
          <div class="footer">
            <p>Ngày .... tháng .... năm 20....</p>
            <p class="signature">Người làm đơn (Ký và ghi rõ họ tên)</p>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleUpdateStatus = (id: string, status: OrderStatus) => {
    updateOrder(id, { status });
    toast.success('Cập nhật trạng thái thành công!');
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá đơn hàng này?')) return;
    deleteOrder(id);
    toast.success('Đã xoá đơn hàng!');
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Quản lý đơn hàng</h2>
          <p className="text-slate-500">Danh sách học viên đăng ký trực tuyến</p>
        </div>
        <button 
          onClick={exportToExcel}
          className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-xl shadow-emerald-900/20"
        >
          <Download className="w-5 h-5" /> Xuất Excel
        </button>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Tìm tên, SĐT, mã đơn..."
                className="pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-600 outline-none w-64 transition-all"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select 
                className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-400 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                value={filterProvince}
                onChange={e => setFilterProvince(e.target.value)}
              >
                <option value="All">Tất cả tỉnh</option>
                {provinces.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <select 
                className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-400 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
              >
                <option value="All">Tất cả trạng thái</option>
                <option value="pending">Chờ thanh toán</option>
                <option value="paid">Đã thanh toán</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="px-8 py-4">Mã đơn / Ngày tạo</th>
                <th className="px-8 py-4">Học viên</th>
                <th className="px-8 py-4">Loại bằng / Tỉnh</th>
                <th className="px-8 py-4">Trạng thái</th>
                <th className="px-8 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paginatedOrders.length === 0 ? (
                <tr><td colSpan={5} className="px-8 py-12 text-center text-slate-500">Không tìm thấy đơn hàng nào</td></tr>
              ) : paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-900/30 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="font-bold text-white">{order.id}</p>
                    <p className="text-xs text-slate-500">
                      {order.createdAt instanceof Date ? order.createdAt.toLocaleString() : 'N/A'}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-blue-400 font-bold text-xs border border-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {order.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{order.fullName}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3" /> {order.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-widest mr-2 border border-blue-500/20">
                      {order.licenseType}
                    </span>
                    <span className="text-sm text-slate-400">{order.province}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                      {order.status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handlePrint(order)}
                        className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                        title="In hồ sơ"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      {order.status === 'pending' && (
                        <button 
                          onClick={() => handleUpdateStatus(order.id, 'paid')}
                          className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                          title="Xác nhận thanh toán"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
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

        <div className="p-8 bg-slate-900/30 border-t border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Hiển thị <b>{(currentPage - 1) * itemsPerPage + 1}</b> - <b>{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</b> trong tổng số <b>{filteredOrders.length}</b>
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-900 disabled:opacity-50 text-slate-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'bg-slate-950 text-slate-500 border border-slate-800 hover:bg-slate-900'}`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 bg-slate-950 border border-slate-800 rounded-lg hover:bg-slate-900 disabled:opacity-50 text-slate-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
