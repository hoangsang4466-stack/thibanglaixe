import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  CheckCircle2, 
  ChevronRight,
  MapPin,
  Calendar,
  Zap,
  Star,
  Search
} from 'lucide-react';
import RegistrationForm from '../components/RegistrationForm';
import ReviewSection from '../components/ReviewSection';
import { useConfig } from '../context/ConfigContext';

export default function LandingPage() {
  const { province } = useParams();
  const { provinces, venues, prices, landingPages } = useConfig();
  
  // Find the actual province name from the URL slug
  const provinceName = provinces.find(p => 
    p.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/\s+/g, '-') === province
  ) || province?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Hà Nội';

  const landingData = landingPages[provinceName] || {
    title: `Đăng ký thi bằng lái xe tại ${provinceName} – Lịch thi mới nhất 2026`,
    description: `Hệ thống đăng ký thi bằng lái xe tại ${provinceName} uy tín, nhanh chóng. Hỗ trợ hồ sơ A-Z, cam kết đậu, lịch thi sớm nhất tại ${provinceName}.`,
    content: `Bạn đang tìm kiếm địa chỉ đăng ký thi bằng lái xe tại ${provinceName} uy tín, giá rẻ và có lịch thi sớm? Chúng tôi tự hào là đơn vị hàng đầu cung cấp dịch vụ đào tạo và sát hạch lái xe các hạng A1, A2, B1, B2, C tại khu vực ${provinceName}.`
  };

  useEffect(() => {
    document.title = landingData.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', landingData.description);
    }
  }, [landingData]);

  const provinceVenues = venues[provinceName] || [];
  const enabledPrices = prices.filter(p => p.enabled);

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-blue-900 text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/20">
              <MapPin className="w-4 h-4" />
              Khu vực: {provinceName}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] mb-8 tracking-tight">
              Đăng ký thi bằng lái xe tại <span className="text-blue-400">{provinceName}</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-xl">
              Trung tâm đào tạo lái xe uy tín hàng đầu tại <b>{provinceName}</b>. Hỗ trợ hồ sơ A-Z, cam kết đậu, lịch thi sớm nhất trong tuần.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <a 
                href="#register" 
                className="px-10 py-5 bg-white text-blue-900 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl shadow-blue-900/40 flex items-center gap-3 group"
              >
                Đăng ký ngay <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link 
                to="/lookup" 
                className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-3 group"
              >
                Tra cứu hồ sơ <Search className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-blue-100">Cam kết đậu</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-blue-100">Lịch thi sớm</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-blue-100">Hỗ trợ A-Z</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/10 p-8 rounded-[3rem] border border-white/20 backdrop-blur-sm">
              <h3 className="text-2xl font-black mb-6">Sân thi tại {provinceName}</h3>
              <div className="space-y-4">
                {provinceVenues.length > 0 ? provinceVenues.map((v, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">{v}</p>
                      <p className="text-xs text-blue-300">Địa điểm thi sát hạch chuẩn quốc gia</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-blue-200 italic text-sm">Đang cập nhật danh sách sân thi...</p>
                )}
              </div>
              {enabledPrices.length > 0 && (
                <div className="mt-8 p-6 bg-blue-500 rounded-3xl text-center">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Lệ phí trọn gói {enabledPrices[0].type}</p>
                  <p className="text-3xl font-black">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(enabledPrices[0].price)}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 prose prose-slate prose-lg">
          <h2 className="text-4xl font-black text-slate-900 mb-8">Đăng ký thi bằng lái xe tại {provinceName} – Uy tín & Chuyên nghiệp</h2>
          
          <div className="whitespace-pre-wrap text-slate-600 leading-relaxed">
            {landingData.content}
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Tại sao nên chọn chúng tôi tại {provinceName}?</h3>
          <ul>
            <li><strong>Lịch thi cực sớm:</strong> Chúng tôi luôn ưu tiên sắp xếp lịch thi sớm nhất cho học viên tại {provinceName}, giúp bạn tiết kiệm thời gian tối đa.</li>
            <li><strong>Hỗ trợ hồ sơ A-Z:</strong> Bạn chỉ cần cung cấp ảnh chụp CCCD, chúng tôi sẽ hoàn thiện mọi thủ tục hồ sơ đăng ký thi bằng lái xe tại {provinceName} cho bạn.</li>
            <li><strong>Cam kết tỉ lệ đậu cao:</strong> Với bộ tài liệu ôn tập chuẩn và mẹo thi độc quyền, chúng tôi cam kết hỗ trợ học viên đạt kết quả tốt nhất.</li>
            <li><strong>Sân tập chuẩn quốc gia:</strong> Hệ thống sân tập tại {provinceName} hiện đại, xe đời mới, giúp học viên làm quen nhanh chóng với bài thi.</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Bảng giá thi bằng lái xe tại {provinceName} mới nhất</h3>
          <p>
            Chúng tôi cam kết minh bạch về tài chính, lệ phí trọn gói không phát sinh thêm bất kỳ chi phí nào trong suốt quá trình học và thi tại {provinceName}:
          </p>
          <div className="not-prose grid sm:grid-cols-2 gap-4 my-8">
            {enabledPrices.map((p) => (
              <div key={p.type} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">Bằng lái xe {p.type}</p>
                  <p className="text-xs text-slate-400">Trọn gói tại {provinceName}</p>
                </div>
                <p className="text-xl font-black text-blue-600">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Quy trình đăng ký thi bằng lái xe tại {provinceName}</h3>
          <ol>
            <li><strong>Đăng ký tư vấn:</strong> Điền form hoặc liên hệ hotline để được tư vấn hạng bằng phù hợp.</li>
            <li><strong>Hoàn thiện hồ sơ:</strong> Gửi ảnh CCCD và ảnh chân dung qua Zalo hoặc trực tiếp tại văn phòng {provinceName}.</li>
            <li><strong>Nhận tài liệu & Ôn tập:</strong> Nhận bộ 600 câu hỏi và phần mềm mô phỏng, tham gia các buổi hướng dẫn mẹo thi.</li>
            <li><strong>Thi sát hạch:</strong> Tham gia kỳ thi sát hạch tại sân thi {provinceName} theo lịch đã hẹn.</li>
            <li><strong>Nhận bằng:</strong> Nhận bằng lái xe sau 10-15 ngày làm việc kể từ ngày thi đỗ.</li>
          </ol>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <RegistrationForm initialProvince={provinceName} />
        </div>
      </section>

      <ReviewSection />
    </div>
  );
}
