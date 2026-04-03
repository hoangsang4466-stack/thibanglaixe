import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Phone, 
  IdCard, 
  User, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { Order } from '../types';

export default function Lookup() {
  const { orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Order[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const filtered = orders.filter(order => 
      order.phone.includes(searchQuery.trim()) || 
      order.idNumber.includes(searchQuery.trim())
    );

    setResults(filtered);
    setHasSearched(true);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          label: 'Chờ thanh toán', 
          icon: Clock, 
          color: 'text-orange-500 bg-orange-50 border-orange-100',
          desc: 'Hồ sơ đang chờ bạn hoàn tất thanh toán để xử lý.'
        };
      case 'paid':
        return { 
          label: 'Đã thanh toán', 
          icon: CheckCircle2, 
          color: 'text-blue-500 bg-blue-50 border-blue-100',
          desc: 'Chúng tôi đã nhận được thanh toán và đang xử lý hồ sơ.'
        };
      case 'processing':
        return { 
          label: 'Đang xử lý', 
          icon: ShieldCheck, 
          color: 'text-indigo-500 bg-indigo-50 border-indigo-100',
          desc: 'Hồ sơ của bạn đang được gửi lên Sở GTVT.'
        };
      case 'completed':
        return { 
          label: 'Hoàn thành', 
          icon: CheckCircle2, 
          color: 'text-emerald-500 bg-emerald-50 border-emerald-100',
          desc: 'Hồ sơ đã hoàn tất. Vui lòng kiểm tra lịch thi cụ thể.'
        };
      case 'cancelled':
        return { 
          label: 'Đã hủy', 
          icon: XCircle, 
          color: 'text-rose-500 bg-rose-50 border-rose-100',
          desc: 'Hồ sơ đã bị hủy. Vui lòng liên hệ hỗ trợ để biết thêm chi tiết.'
        };
      default:
        return { 
          label: 'Không xác định', 
          icon: AlertCircle, 
          color: 'text-slate-500 bg-slate-50 border-slate-100',
          desc: 'Trạng thái hồ sơ không xác định.'
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang chủ
          </Link>
          <div className="text-right">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Tra cứu hồ sơ</h1>
            <p className="text-sm text-slate-500">Kiểm tra trạng thái đăng ký của bạn</p>
          </div>
        </div>

        {/* Search Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 mb-8"
        >
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Nhập số điện thoại hoặc số CCCD..."
                className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg font-medium"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 group"
            >
              Tìm kiếm hồ sơ <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          <div className="mt-6 flex items-center gap-4 text-xs text-slate-400 font-medium uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Số điện thoại
            </div>
            <div className="w-1 h-1 bg-slate-200 rounded-full" />
            <div className="flex items-center gap-1.5">
              <IdCard className="w-3.5 h-3.5" /> Số CCCD/CMND
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {hasSearched ? (
              results.length > 0 ? (
                results.map((order, index) => {
                  const status = getStatusConfig(order.status);
                  const StatusIcon = status.icon;
                  
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden"
                    >
                      <div className="p-8">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                              <User className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">{order.fullName}</h3>
                              <p className="text-sm text-slate-500 font-medium">Mã hồ sơ: <span className="text-blue-600 font-bold">{order.id}</span></p>
                            </div>
                          </div>
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm ${status.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            {status.label}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 mb-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-600">
                              <Phone className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium">{order.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                              <IdCard className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium">{order.idNumber}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium">{order.province} - {order.venue}</span>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-600">
                              <ShieldCheck className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium">Bằng lái hạng {order.licenseType}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium">Ngày thi: {new Date(order.examDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-medium">Đăng ký: {order.createdAt.toLocaleDateString('vi-VN')}</span>
                            </div>
                          </div>
                        </div>

                        <div className={`p-4 rounded-2xl border ${status.color} bg-opacity-50`}>
                          <p className="text-sm font-medium">{status.desc}</p>
                        </div>
                      </div>
                      
                      {order.status === 'pending' && (
                        <Link 
                          to={`/payment/${order.id}`}
                          className="block w-full py-4 bg-blue-600 text-white text-center font-bold hover:bg-blue-700 transition-colors"
                        >
                          Thanh toán ngay
                        </Link>
                      )}
                    </motion.div>
                  );
                })
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Không tìm thấy hồ sơ</h3>
                  <p className="text-slate-500 max-w-xs mx-auto">
                    Vui lòng kiểm tra lại số điện thoại hoặc số CCCD bạn đã nhập.
                  </p>
                </motion.div>
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                  Nhập thông tin để tra cứu
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
