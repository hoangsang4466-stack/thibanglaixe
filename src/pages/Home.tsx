import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  Bike, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Award, 
  CheckCircle2, 
  ChevronRight,
  Star,
  Users,
  Zap,
  Search,
  Plus,
  Minus,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import ReviewSection from '../components/ReviewSection';
import { useConfig } from '../context/ConfigContext';

const FAQS = [
  {
    q: "Hồ sơ đăng ký thi bằng lái xe cần những gì?",
    a: "Bạn chỉ cần cung cấp ảnh chụp CCCD (2 mặt) và 1 ảnh chân dung. Chúng tôi sẽ hỗ trợ hoàn thiện mọi thủ tục hồ sơ còn lại cho bạn."
  },
  {
    q: "Bao lâu thì có lịch thi sau khi đăng ký?",
    a: "Thông thường sau khi hoàn tất hồ sơ, bạn sẽ có lịch thi trong vòng 1-2 tuần. Chúng tôi luôn ưu tiên sắp xếp lịch thi sớm nhất có thể."
  },
  {
    q: "Nếu tôi thi trượt thì có được thi lại không?",
    a: "Có, bạn hoàn toàn có thể đăng ký thi lại. Chúng tôi sẽ hỗ trợ bạn thủ tục thi lại nhanh chóng và cung cấp thêm tài liệu ôn tập để đảm bảo bạn đỗ ở lần thi tiếp theo."
  },
  {
    q: "Lệ phí trọn gói đã bao gồm những gì?",
    a: "Lệ phí trọn gói đã bao gồm: phí hồ sơ, tài liệu ôn tập, phí đào tạo và lệ phí thi sát hạch. Cam kết không phát sinh thêm bất kỳ chi phí nào khác."
  }
];

export default function Home() {
  const { settings, prices } = useConfig();
  const [timeLeft, setTimeLeft] = useState(3600 * 24 + 3600 * 5); // 29 hours
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const enabledPrices = prices.filter(p => p.enabled);

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-blue-100">
              <Award className="w-4 h-4" />
              Trung tâm đào tạo lái xe uy tín số 1
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 animate-bounce">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest">Ưu đãi kết thúc sau:</span>
              </div>
              <div className="flex items-center gap-1 font-mono font-black text-rose-600 text-xl">
                {formatTime(timeLeft)}
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] mb-8 tracking-tight text-slate-900">
              {settings.bannerTitle}
            </h1>
            
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
              {settings.bannerDescription}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <a 
                href="#register" 
                className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center gap-3 group"
              >
                Đăng ký ngay <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link 
                to="/lookup" 
                className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-3 group"
              >
                Tra cứu hồ sơ <Search className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>
            </div>

            <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm mb-12 w-fit relative group overflow-hidden">
              <div className="absolute inset-0 bg-blue-50/50 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="flex -space-x-3 relative z-10">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?u=${i+50}`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                  +99
                </div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-slate-900">15,000+ Học viên</p>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                    Live
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Đánh giá 4.9/5 • 152 đang xem</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-600">Cam kết đậu</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-600">Lịch thi sớm</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-600">Hỗ trợ A-Z</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000" 
                alt="Driving" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            
            {/* Promo Popup */}
            <div className="absolute -top-6 -right-6 bg-rose-600 text-white p-6 rounded-3xl shadow-2xl z-20 max-w-[200px] animate-bounce">
              <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Khuyến mãi</p>
              <p className="text-2xl font-black mb-2">GIẢM 20%</p>
              <p className="text-[10px] leading-tight opacity-90">Dành cho học viên đăng ký trong hôm nay!</p>
              <div className="mt-3 py-1 px-2 bg-white/20 rounded-lg text-center font-mono text-sm">
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl z-20 border border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900">98%</p>
                  <p className="text-xs font-bold text-slate-400 uppercase">Tỉ lệ thi đỗ</p>
                </div>
              </div>
              <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[98%]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Bảng giá trọn gói</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Cam kết không phát sinh thêm chi phí. Bao gồm tài liệu, lệ phí thi và hỗ trợ hồ sơ.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enabledPrices.map((p) => (
              <div key={p.type} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:scale-105 transition-all group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {p.type === 'A1' ? <Bike className="w-8 h-8" /> : p.type === 'C' ? <Truck className="w-8 h-8" /> : <Car className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-black mb-2">Bằng lái xe {p.type}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-black text-blue-900">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Hỗ trợ hồ sơ A-Z
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Tài liệu ôn thi miễn phí
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Lịch thi sớm nhất
                  </li>
                </ul>
                <a 
                  href="#register" 
                  className="block w-full py-4 bg-slate-900 text-white text-center rounded-2xl font-bold hover:bg-blue-600 transition-all"
                >
                  Đăng ký ngay
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Funnel */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <RegistrationForm />
        </div>
      </section>

      {/* Reviews */}
      <ReviewSection />

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <HelpCircle className="w-4 h-4" />
              Giải đáp thắc mắc
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Câu hỏi thường gặp</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div 
                key={i} 
                className={`border rounded-3xl transition-all duration-300 ${openFaq === i ? 'border-blue-200 bg-blue-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-slate-900">{faq.q}</span>
                  {openFaq === i ? <Minus className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-slate-400" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section id="contact" className="py-24 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-black mb-6">{settings.siteName}</h3>
            <p className="text-blue-200 leading-relaxed mb-8">
              Hệ thống đăng ký thi bằng lái xe trực tuyến uy tín hàng đầu Việt Nam. Chúng tôi đồng hành cùng bạn trên mọi nẻo đường.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Star className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <Star className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Thông tin liên hệ</h4>
            <ul className="space-y-4 text-blue-200">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400" /> 
                <span>Làm việc: 08:00 - 21:00 (T2 - CN)</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-5 h-5 text-blue-400" /> 
                <span>Hotline: {settings.supportPhone}</span>
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400" /> 
                <span>Email: {settings.supportEmail}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Văn phòng đại diện</h4>
            <ul className="space-y-4 text-blue-200">
              <li>• Hà Nội: Số 1, Đường ABC, Quận Cầu Giấy</li>
              <li>• TP Hồ Chí Minh: Số 100, Đường XYZ, Quận 1</li>
              <li>• Đà Nẵng: Số 50, Đường MNP, Quận Hải Châu</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
