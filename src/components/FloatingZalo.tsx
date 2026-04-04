import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export default function FloatingZalo() {
  const { settings } = useConfig();
  // Đã sửa: Lấy trực tiếp link Zalo gốc, loại bỏ tham số ?text= gây lỗi trên điện thoại
  const zaloUrl = settings.zaloLink;

  return (
    <a
      href={zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group"
    >
      <div className="flex items-center gap-2 md:gap-3 bg-blue-600 text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all group-hover:scale-105">
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
        <span className="font-bold text-xs md:text-sm">{settings.zaloConsultLabel}</span>
      </div>
      <div className="absolute -top-12 right-0 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-100 hidden md:block">
        Hỗ trợ 24/7 - Có lịch thi sớm!
      </div>
    </a>
  );
}
