import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Phone, 
  IdCard, 
  Mail, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  AlertCircle,
  Search,
  ChevronDown
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useConfig } from '../context/ConfigContext';
import { toast } from 'react-hot-toast';
import { LicenseType, Order } from '../types';

export default function RegistrationForm({ initialProvince }: { initialProvince?: string }) {
  const navigate = useNavigate();
  const { addOrder } = useOrders();
  const { provinces, venues, prices } = useConfig();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [provinceSearch, setProvinceSearch] = useState('');
  const [isProvinceOpen, setIsProvinceOpen] = useState(false);
  const provinceRef = useRef<HTMLDivElement>(null);

  const enabledPrices = prices.filter(p => p.enabled);
  const defaultLicense = enabledPrices.length > 0 ? enabledPrices[0].type : 'A1' as LicenseType;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    idNumber: '',
    email: '',
    province: initialProvince || provinces[0] || 'Hà Nội',
    venue: '',
    licenseType: defaultLicense,
    examDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const provinceVenues = venues[formData.province] || [];
    setFormData(prev => ({ ...prev, venue: provinceVenues[0] || '' }));
  }, [formData.province, venues]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (provinceRef.current && !provinceRef.current.contains(event.target as Node)) {
        setIsProvinceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProvinces = provinces.filter(p => 
    p.toLowerCase().includes(provinceSearch.toLowerCase())
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
    if (!/^0[0-9]{9}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)';
    if (!/^[0-9]{9,12}$/.test(formData.idNumber)) newErrors.idNumber = 'Số CCCD/CMND không hợp lệ (9-12 số)';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (!formData.examDate) newErrors.examDate = 'Vui lòng chọn ngày thi dự kiến';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const orderId = `BLX${Date.now()}`;
    const priceObj = prices.find(p => p.type === formData.licenseType);
    const amount = priceObj ? priceObj.price : 0;

    try {
      const newOrder: Order = {
        ...formData,
        id: orderId,
        amount,
        status: 'pending',
        createdAt: new Date(),
      };
      
      addOrder(newOrder);
      
      toast.success('Đăng ký thành công!');
      navigate(`/payment/${orderId}`, { state: { order: newOrder } });
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="register" className="scroll-mt-24">
      {!showForm ? (
        <div className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-100 max-w-2xl mx-auto border border-blue-50"
          >
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Kiểm tra lịch thi gần nhất</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Hệ thống sẽ tự động cập nhật lịch thi mới nhất tại <b>{formData.province}</b> và các tỉnh thành lân cận.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 group"
            >
              Xem lịch thi & Đăng ký ngay <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Cam kết đậu</span>
              </div>
              <div className="flex flex-col items-center gap-2 border-x border-slate-100">
                <Clock className="w-6 h-6 text-orange-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Lịch thi sớm</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-blue-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Hỗ trợ A-Z</span>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-3xl mx-auto relative overflow-hidden"
        >
          {/* Urgency Badge */}
          <div className="absolute top-6 right-[-35px] bg-rose-600 text-white px-10 py-1 rotate-45 text-[10px] font-black uppercase tracking-widest shadow-lg z-10">
            Hot Deal
          </div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
              <IdCard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Hồ sơ đăng ký trực tuyến</h2>
              <p className="text-sm text-slate-400">Vui lòng điền chính xác thông tin cá nhân</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Họ và tên</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.fullName ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                {errors.fullName && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Số điện thoại</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="tel"
                    placeholder="0912 345 678"
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.phone ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                {errors.phone && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
              </div>

              {/* ID Number */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Số CCCD/CMND</label>
                <div className="relative">
                  <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="012345678910"
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.idNumber ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                    value={formData.idNumber}
                    onChange={e => setFormData({ ...formData, idNumber: e.target.value })}
                  />
                </div>
                {errors.idNumber && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.idNumber}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email (không bắt buộc)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.email ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
              </div>

              {/* Province - Searchable Dropdown */}
              <div className="space-y-2 relative" ref={provinceRef}>
                <label className="text-sm font-bold text-slate-700 ml-1">Tỉnh/Thành phố</label>
                <div 
                  className="relative cursor-pointer"
                  onClick={() => setIsProvinceOpen(!isProvinceOpen)}
                >
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <div className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 flex items-center justify-between">
                    <span>{formData.province}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isProvinceOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {isProvinceOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-3 border-b border-slate-100 bg-slate-50">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Tìm kiếm tỉnh thành..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            value={provinceSearch}
                            onChange={e => setProvinceSearch(e.target.value)}
                            onClick={e => e.stopPropagation()}
                          />
                        </div>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {filteredProvinces.length > 0 ? (
                          filteredProvinces.map(p => (
                            <button
                              key={p}
                              type="button"
                              className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors flex items-center justify-between ${formData.province === p ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700'}`}
                              onClick={() => {
                                setFormData({ ...formData, province: p });
                                setIsProvinceOpen(false);
                                setProvinceSearch('');
                              }}
                            >
                              {p}
                              {formData.province === p && <CheckCircle2 className="w-4 h-4" />}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-slate-400 text-sm italic">
                            Không tìm thấy tỉnh thành nào
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Venue */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Sân thi dự kiến</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <select
                    className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-slate-900"
                    value={formData.venue}
                    onChange={e => setFormData({ ...formData, venue: e.target.value })}
                  >
                    {(venues[formData.province] || []).map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              {/* License Type */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Loại bằng đăng ký</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <select
                    className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-slate-900"
                    value={formData.licenseType}
                    onChange={e => setFormData({ ...formData, licenseType: e.target.value as LicenseType })}
                  >
                    {enabledPrices.map(p => (
                      <option key={p.type} value={p.type}>Bằng lái xe {p.type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              {/* Exam Date */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Ngày thi dự kiến</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="date"
                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.examDate ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900`}
                    value={formData.examDate}
                    onChange={e => setFormData({ ...formData, examDate: e.target.value })}
                  />
                </div>
                {errors.examDate && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.examDate}</p>}
              </div>
            </div>

            {/* Price Display */}
            <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Lệ phí trọn gói</p>
                <p className="text-3xl font-black text-blue-900">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prices.find(p => p.type === formData.licenseType)?.price || 0)}
                </p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-400 italic">* Không phát sinh thêm chi phí</p>
                <p className="text-xs text-slate-400 italic">* Bao gồm tài liệu & lệ phí thi</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Xác nhận đăng ký <ChevronRight className="w-6 h-6" /></>
              )}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
