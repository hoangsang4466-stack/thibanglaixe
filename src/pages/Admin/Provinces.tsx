import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Save, ChevronRight, Map as MapIcon, Info } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { toast } from 'react-hot-toast';

export default function AdminProvinces() {
  const { provinces, venues, addProvince, deleteProvince, addVenue, deleteVenue, resetToDefaults } = useConfig();
  const [selectedProvince, setSelectedProvince] = useState(provinces[0]);
  const [newProvince, setNewProvince] = useState('');
  const [newVenue, setNewVenue] = useState('');

  const handleReset = () => {
    if (!window.confirm('Bạn có chắc chắn muốn khôi phục danh sách Tỉnh & Sân thi về mặc định? Mọi thay đổi của bạn sẽ bị mất.')) return;
    resetToDefaults();
    toast.success('Đã khôi phục danh sách mặc định!');
  };

  const handleAddProvince = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProvince.trim()) return;
    if (provinces.includes(newProvince.trim())) {
      toast.error('Tỉnh này đã tồn tại!');
      return;
    }
    addProvince(newProvince.trim());
    setNewProvince('');
    toast.success('Đã thêm tỉnh mới!');
  };

  const handleDeleteProvince = (name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xoá tỉnh ${name}? Tất cả sân thi liên quan cũng sẽ bị xoá.`)) return;
    deleteProvince(name);
    if (selectedProvince === name) setSelectedProvince(provinces[0]);
    toast.success('Đã xoá tỉnh!');
  };

  const handleAddVenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVenue.trim() || !selectedProvince) return;
    if (venues[selectedProvince]?.includes(newVenue.trim())) {
      toast.error('Sân thi này đã tồn tại trong tỉnh!');
      return;
    }
    addVenue(selectedProvince, newVenue.trim());
    setNewVenue('');
    toast.success('Đã thêm sân thi mới!');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Quản lý Tỉnh & Sân thi</h2>
          <p className="text-slate-500">Cấu hình danh sách địa điểm thi trên toàn quốc</p>
        </div>
        <button 
          onClick={handleReset}
          className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700"
        >
          Khôi phục mặc định
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Provinces List */}
        <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col h-[600px]">
          <div className="p-6 border-b border-slate-800 bg-slate-900/50">
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" /> Danh sách Tỉnh ({provinces.length})
            </h3>
          </div>
          
          <div className="p-4 border-b border-slate-800">
            <form onSubmit={handleAddProvince} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Thêm tỉnh mới..."
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                value={newProvince}
                onChange={e => setNewProvince(e.target.value)}
              />
              <button type="submit" className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
                <Plus className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {provinces.map((p) => (
              <div 
                key={p}
                onClick={() => setSelectedProvince(p)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all group ${selectedProvince === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-900 text-slate-400'}`}
              >
                <span className="font-bold text-sm">{p}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${selectedProvince === p ? 'text-blue-200' : 'text-slate-600'}`}>
                    {(venues[p] || []).length} sân
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteProvince(p); }}
                    className={`p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${selectedProvince === p ? 'hover:bg-blue-700 text-white' : 'hover:bg-rose-500/20 text-rose-500'}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venues List */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col h-[600px]">
          <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-emerald-500" /> Sân thi tại {selectedProvince}
              </h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Quản lý địa điểm thi cụ thể</p>
            </div>
            <form onSubmit={handleAddVenue} className="flex gap-2 w-72">
              <input 
                type="text" 
                placeholder="Thêm sân thi mới..."
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
                value={newVenue}
                onChange={e => setNewVenue(e.target.value)}
              />
              <button type="submit" className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20">
                <Plus className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto p-8 grid md:grid-cols-2 gap-4 content-start">
            {(venues[selectedProvince] || []).length === 0 ? (
              <div className="md:col-span-2 flex flex-col items-center justify-center py-20 text-slate-600">
                <MapIcon className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-bold text-lg">Chưa có sân thi nào</p>
                <p className="text-sm">Hãy thêm sân thi đầu tiên cho tỉnh {selectedProvince}</p>
              </div>
            ) : (
              (venues[selectedProvince] || []).map((v, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl group hover:border-emerald-500/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 font-bold text-xs border border-emerald-500/20">
                      {i + 1}
                    </div>
                    <span className="text-sm font-bold text-white">{v}</span>
                  </div>
                  <button 
                    onClick={() => deleteVenue(selectedProvince, v)}
                    className="p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Info className="text-white w-5 h-5" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Các sân thi này sẽ hiển thị trong dropdown khi học viên chọn tỉnh <b>{selectedProvince}</b> trong form đăng ký. 
              Hãy đảm bảo tên sân thi chính xác để học viên dễ dàng nhận biết.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
