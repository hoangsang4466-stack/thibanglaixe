import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  DollarSign, 
  CreditCard, 
  MapPin, 
  FileText, 
  Star, 
  MessageSquare, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  Home,
  ShieldCheck
} from 'lucide-react';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Đơn hàng', path: '/admin/orders' },
  { icon: Settings, label: 'Cài đặt chung', path: '/admin/settings' },
  { icon: DollarSign, label: 'Bảng giá', path: '/admin/pricing' },
  { icon: CreditCard, label: 'Thanh toán', path: '/admin/payment' },
  { icon: MapPin, label: 'Tỉnh & Sân thi', path: '/admin/provinces' },
  { icon: FileText, label: 'Landing Page', path: '/admin/landing' },
  { icon: Star, label: 'Đánh giá', path: '/admin/reviews' },
  { icon: MessageSquare, label: 'Cài đặt SMS', path: '/admin/sms' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-slate-950 border-r border-slate-800 transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          {isSidebarOpen && <span className="ml-3 text-xl font-black text-white tracking-tight">Admin Panel</span>}
        </div>

        <nav className="p-4 space-y-2">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-900 hover:text-white'}`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`} />
                {isSidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
                {isActive && isSidebarOpen && <ChevronRight className="ml-auto w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-slate-900 transition-all text-slate-500 hover:text-white"
          >
            <Home className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-bold text-sm">Về trang chủ</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-rose-900/20 transition-all text-slate-500 hover:text-rose-400"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-bold text-sm">Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <header className="h-20 bg-slate-950/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-xl transition-all"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">Administrator</p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center font-bold text-blue-400">
              AD
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
