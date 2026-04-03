import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export default function Footer() {
  const { settings } = useConfig();

  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                {settings.logoUrl ? (
                  <img src={settings.logoUrl} alt="Logo" className="w-5 h-5 object-contain" />
                ) : (
                  <ShieldCheck className="text-white w-5 h-5" />
                )}
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">{settings.siteName}</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Nền tảng đăng ký thi bằng lái xe trực tuyến hàng đầu Việt Nam. 
              Chúng tôi cam kết mang lại trải nghiệm tốt nhất cho học viên.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-slate-900">Liên kết</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Câu hỏi thường gặp</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-slate-900">Liên hệ</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> {settings.supportPhone}</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4" /> {settings.supportEmail}</li>
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4" /> Hà Nội, Việt Nam</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 mt-12 pt-8 text-center text-sm text-slate-400">
          © 2026 {settings.siteName}. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}
