import React from 'react';
import { DollarSign, Eye, EyeOff, Save, Info } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { toast } from 'react-hot-toast';

export default function AdminPricing() {
  const { prices, updatePrice } = useConfig();

  const handlePriceChange = (type: any, value: string) => {
    const numValue = parseInt(value.replace(/\D/g, '')) || 0;
    updatePrice(type, { price: numValue });
  };

  const handleToggle = (type: any, enabled: boolean) => {
    updatePrice(type, { enabled });
    toast.success(`${enabled ? 'Bật' : 'Tắt'} gói ${type} thành công!`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">Quản lý bảng giá</h2>
        <p className="text-slate-500">Cập nhật giá và trạng thái hiển thị của các gói bằng lái</p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="px-8 py-6">Loại bằng</th>
                <th className="px-8 py-6">Giá hiện tại (VNĐ)</th>
                <th className="px-8 py-6">Trạng thái hiển thị</th>
                <th className="px-8 py-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {prices.map((p) => (
                <tr key={p.type} className="hover:bg-slate-900/30 transition-colors group">
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 font-black text-xl border border-blue-500/20">
                        {p.type}
                      </div>
                      <div>
                        <p className="font-bold text-white">Bằng lái xe {p.type}</p>
                        <p className="text-xs text-slate-500">Gói trọn gói, không phát sinh</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="relative max-w-[200px]">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                      <input 
                        type="text" 
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all font-bold"
                        value={new Intl.NumberFormat('vi-VN').format(p.price)}
                        onChange={e => handlePriceChange(p.type, e.target.value)}
                      />
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <button 
                      onClick={() => handleToggle(p.type, !p.enabled)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${p.enabled ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}
                    >
                      {p.enabled ? <><Eye className="w-4 h-4" /> Đang hiển thị</> : <><EyeOff className="w-4 h-4" /> Đã ẩn</>}
                    </button>
                  </td>
                  <td className="px-8 py-8 text-right">
                    <button 
                      onClick={() => toast.success('Đã lưu giá mới!')}
                      className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-[2rem] flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
          <Info className="text-white w-5 h-5" />
        </div>
        <div>
          <h4 className="text-white font-bold mb-1">Lưu ý về bảng giá</h4>
          <p className="text-sm text-blue-200/70 leading-relaxed">
            Giá được cập nhật sẽ hiển thị ngay lập tức trên toàn bộ website và các trang landing page tỉnh thành. 
            Nếu bạn tắt hiển thị một gói, học viên sẽ không thể chọn gói đó trong form đăng ký.
          </p>
        </div>
      </div>
    </div>
  );
}
