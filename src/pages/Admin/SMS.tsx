import React, { useState } from 'react';
import { MessageSquare, Save, Key, FileText, Info, AlertTriangle } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { toast } from 'react-hot-toast';

export default function AdminSMS() {
  const { sms, updateSMS } = useConfig();
  const [formData, setFormData] = useState(sms);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSMS(formData);
    toast.success('Đã lưu cấu hình SMS!');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Cài đặt SMS</h2>
          <p className="text-slate-500">Cấu hình gửi tin nhắn xác nhận tự động cho học viên</p>
        </div>
        <button 
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20"
        >
          <Save className="w-5 h-5" /> Lưu cấu hình
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* API Config */}
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-blue-500" /> Cấu hình API
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">SMS API Key (eSms, SpeedSMS...)</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                <input 
                  type="password" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={formData.apiKey}
                  onChange={e => setFormData({ ...formData, apiKey: e.target.value })}
                  placeholder="Nhập API Key của bạn..."
                />
              </div>
            </div>

            <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="text-white w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Lưu ý bảo mật</h4>
                <p className="text-xs text-orange-200/70 leading-relaxed">
                  API Key sẽ được sử dụng để gửi tin nhắn xác nhận. Hãy đảm bảo bạn đã nạp tiền vào tài khoản SMS Gateway trước khi sử dụng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Template Config */}
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-500" /> Nội dung tin nhắn
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mẫu tin nhắn (Template)</label>
              <textarea 
                className="w-full p-6 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-emerald-600 outline-none transition-all min-h-[150px] font-mono text-sm leading-relaxed"
                value={formData.template}
                onChange={e => setFormData({ ...formData, template: e.target.value })}
              />
              <p className="text-[10px] text-slate-500 italic ml-1">Sử dụng {`{order_id}`} để chèn mã đơn hàng tự động.</p>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Xem trước tin nhắn</p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
                <div className="absolute -left-2 top-4 w-4 h-4 bg-slate-950 border-l border-b border-slate-800 rotate-45" />
                <p className="text-sm text-white italic">
                  {formData.template.replace('{order_id}', 'GPLX-12345')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-[2.5rem] flex items-start gap-6">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/20">
          <Info className="text-white w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xl font-black text-white tracking-tight mb-2">Hướng dẫn tích hợp SMS</h4>
          <div className="grid md:grid-cols-3 gap-8 mt-4">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-blue-400 font-black text-xs border border-slate-800">1</div>
              <p className="text-sm font-bold text-white">Đăng ký tài khoản</p>
              <p className="text-xs text-slate-500">Tạo tài khoản tại các nhà cung cấp như eSms.vn hoặc SpeedSMS.vn</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-blue-400 font-black text-xs border border-slate-800">2</div>
              <p className="text-sm font-bold text-white">Lấy API Key</p>
              <p className="text-xs text-slate-500">Truy cập phần cài đặt API trong dashboard của nhà cung cấp để lấy key</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-blue-400 font-black text-xs border border-slate-800">3</div>
              <p className="text-sm font-bold text-white">Cấu hình & Lưu</p>
              <p className="text-xs text-slate-500">Dán API Key vào ô bên trên và lưu lại. Hệ thống sẽ tự động gửi SMS khi có đơn mới.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
