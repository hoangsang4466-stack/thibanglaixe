import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Menu, X, MessageSquare } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export default function Header() {
  const { settings } = useConfig();
  const [isOpen, setIsOpen] = useState(false);

  // ✅ FIX ZALO CHUẨN 100%
  const handleZaloClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Lấy toàn bộ số (fix lỗi sai số)
    let phone = (settings?.zaloLink || '').replace(/\D/g, '');

    // Chuẩn hóa số VN
    if (phone.startsWith('84')) {
      phone = '0' + phone.slice(2);
    }

    // fallback nếu không có
    if (!phone) phone = '0824337101';

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `https://zalo.me/${phone}`;
    } else {
      window.open(`https://chat.zalo.me/?phone=${phone}`, '_blank');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            {settings?.logoUrl ? (
              <img src={settings.logoUrl} alt="Logo" className="w-6 h-6 object-contain" />
            ) : (
              <ShieldCheck className="text-white w-6 h-6" />
            )}
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            {settings?.siteName || "GPLX Online"}
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
          <Link to="/lookup" className="hover:text-blue-600">Tra cứu hồ sơ</Link>
          <a href="#register" className="hover:text-blue-600">Đăng ký</a>
          <a href="#pricing" className="hover:text-blue-600">Bảng giá</a>
          <a href="#contact" className="hover:text-blue-600">Liên hệ</a>
        </nav>

        {/* ZALO BUTTON */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#"
            onClick={handleZaloClick}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg"
          >
            <MessageSquare className="w-4 h-4" />
            {settings?.zaloChatLabel || "Chat Zalo"}
          </a>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)}>Trang chủ</Link>
          <Link to="/lookup" onClick={() => setIsOpen(false)}>Tra cứu hồ sơ</Link>
          <a href="#register" onClick={() => setIsOpen(false)}>Đăng ký</a>
          <a href="#pricing" onClick={() => setIsOpen(false)}>Bảng giá</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Liên hệ</a>

          <a 
            href="#"
            onClick={(e) => {
              setIsOpen(false);
              handleZaloClick(e);
            }}
            className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl font-bold"
          >
            <MessageSquare className="w-4 h-4" />
            {settings?.zaloChatLabel || "Chat Zalo"}
          </a>
        </div>
      )}
    </header>
  );
}
