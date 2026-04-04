import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export default function FloatingZalo() {
  const { settings } = useConfig();

  const handleZaloClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Tự động bóc tách chỉ lấy số điện thoại, sửa đầu 84 thành 0
    const rawLink = settings.zaloLink || '';
    const phoneMatch = rawLink.match(/\d+/);
    let phone = phoneMatch ? phoneMatch[0] : '0824337101'; 
    if (phone.startsWith('84')) {
      phone = '0' + phone.substring(2);
    }

    // Ép mở app Zalo
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `https://zalo.me/${phone}`;
    } else {
      window.open(`https://chat.zalo.me/?phone=${phone}`, '_blank');
    }
  };

  return (
    <a
      href="#"
      onClick={handleZaloClick}
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
