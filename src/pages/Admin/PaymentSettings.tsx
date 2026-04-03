import React, { useState } from 'react';
import { CreditCard, QrCode, Save, Banknote, Type, Hash, User, FileText, ToggleLeft, ToggleRight } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { toast } from 'react-hot-toast';

export default function AdminPayment() {
  const { payment, updatePayment } = useConfig();
  const [formData, setFormData] = useState(payment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePayment(formData);
    toast.success('Đã lưu cấu hình thanh toán!');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Cài đặt thanh toán</h2>
          <p className="text-slate-500">Cấu hình tài khoản ngân hàng và mã QR thanh toán</p>
        </div>
        <button 
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20"
        >
          <Save className="w-5 h-5" /> Lưu cấu hình
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Bank Account */}
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Banknote className="w-5 h-5 text-blue-500" /> Tài khoản ngân hàng
            </h3>
            <button 
              onClick={() => setFormData({ ...formData, enableTransfer: !formData.enableTransfer })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.enableTransfer ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}
            >
              {formData.enableTransfer ? <><ToggleRight className="w-4 h-4" /> Bật</> : <><ToggleLeft className="w-4 h-4" /> Tắt</>}
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tên ngân hàng</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={formData.bankName}
                  onChange={e => setFormData({ ...formData, bankName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Số tài khoản</label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={formData.accountNumber}
                  onChange={e => setFormData({ ...formData, accountNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Chủ tài khoản</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={formData.accountName}
                  onChange={e => setFormData({ ...formData, accountName: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* QR & Content */}
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-500" /> Cấu hình QR Code
            </h3>
            <button 
              onClick={() => setFormData({ ...formData, enableQR: !formData.enableQR })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.enableQR ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}
            >
              {formData.enableQR ? <><ToggleRight className="w-4 h-4" /> Bật</> : <><ToggleLeft className="w-4 h-4" /> Tắt</>}
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Template VietQR</label>
              <select 
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                value={formData.qrTemplate}
                onChange={e => setFormData({ ...formData, qrTemplate: e.target.value })}
              >
                <option value="compact">Compact (Gọn)</option>
                <option value="compact2">Compact 2 (Gọn 2)</option>
                <option value="qr_only">Chỉ QR Code</option>
                <option value="print">Bản in</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nội dung chuyển khoản (Template)</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value="BLX_{order_id}"
                  disabled
                />
              </div>
              <p className="text-[10px] text-slate-500 italic ml-1">Hệ thống tự động thay {`{order_id}`} bằng mã đơn hàng thực tế.</p>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-white p-2 rounded-xl mx-auto mb-4">
                  <img 
                    src={`https://img.vietqr.io/image/${formData.bankName}-${formData.accountNumber}-${formData.qrTemplate}.png?accountName=${encodeURIComponent(formData.accountName)}&amount=0&addInfo=DEMO`} 
                    alt="QR Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Preview QR Code</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
