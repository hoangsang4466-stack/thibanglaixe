import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, CheckCircle2, Clock, MapPin } from 'lucide-react';

const NAMES = ['Anh Minh', 'Chị Lan', 'Anh Tuấn', 'Chị Hạnh', 'Anh Dũng', 'Chị Mai', 'Anh Hoàng', 'Chị Thảo', 'Anh Nam', 'Chị Phương'];
const PROVINCES = ['Hà Nội', 'TP Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Bình Dương', 'Đồng Nai', 'Quảng Ninh', 'Thanh Hóa', 'Nghệ An'];
const LICENSES = ['A1', 'A2', 'B1', 'B2', 'C'];

export default function SocialProof() {
  const [notification, setNotification] = useState<{ name: string; province: string; license: string; time: string } | null>(null);

  useEffect(() => {
    const showNotification = () => {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const province = PROVINCES[Math.floor(Math.random() * PROVINCES.length)];
      const license = LICENSES[Math.floor(Math.random() * LICENSES.length)];
      const time = Math.floor(Math.random() * 10) + 1;

      setNotification({ name, province, license, time: `${time} phút trước` });

      // Hide after 5 seconds
      setTimeout(() => setNotification(null), 5000);
    };

    // Initial delay
    const initialTimer = setTimeout(showNotification, 3000);

    // Repeat every 15-30 seconds
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 15000 + 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 max-w-[300px]"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {notification.name} <span className="font-normal text-slate-500">vừa đăng ký thi bằng</span> {notification.license}
              </p>
              <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                <div className="flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" /> {notification.province}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" /> {notification.time}
                </div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
              <CheckCircle2 className="w-3 h-3" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
