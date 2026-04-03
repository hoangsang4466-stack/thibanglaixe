import React, { useState } from 'react';
import { FileText, Save, Search, ChevronRight, Globe, Info, Type, MessageSquare } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { toast } from 'react-hot-toast';

export default function AdminLanding() {
  const { provinces, landingPages, updateLandingPage } = useConfig();
  const [selectedProvince, setSelectedProvince] = useState(provinces[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const currentConfig = landingPages[selectedProvince] || {
    province: selectedProvince,
    seoTitle: `Đăng ký thi bằng lái xe tại ${selectedProvince} – Lịch thi mới nhất`,
    seoDesc: `Hệ thống đăng ký thi bằng lái xe uy tín tại ${selectedProvince}. Cam kết lịch thi sớm, hỗ trợ hồ sơ A-Z, tỉ lệ đậu cao nhất khu vực.`,
    content: `Chào mừng bạn đến với trung tâm đăng ký thi bằng lái xe tại ${selectedProvince}. Chúng tôi cung cấp dịch vụ đào tạo và sát hạch lái xe các hạng A1, B1, B2, C với chất lượng tốt nhất.`
  };

  const [formData, setFormData] = useState(currentConfig);

  const handleProvinceSelect = (p: string) => {
    setSelectedProvince(p);
    setFormData(landingPages[p] || {
      province: p,
      seoTitle: `Đăng ký thi bằng lái xe tại ${p} – Lịch thi mới nhất`,
      seoDesc: `Hệ thống đăng ký thi bằng lái xe uy tín tại ${p}. Cam kết lịch thi sớm, hỗ trợ hồ sơ A-Z, tỉ lệ đậu cao nhất khu vực.`,
      content: `Chào mừng bạn đến với trung tâm đăng ký thi bằng lái xe tại ${p}. Chúng tôi cung cấp dịch vụ đào tạo và sát hạch lái xe các hạng A1, B1, B2, C với chất lượng tốt nhất.`
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateLandingPage(selectedProvince, formData);
    toast.success(`Đã cập nhật trang ${selectedProvince}!`);
  };

  const filteredProvinces = provinces.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Quản lý Landing Page</h2>
          <p className="text-slate-500">Tối ưu SEO và nội dung cho từng tỉnh thành</p>
        </div>
        <button 
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20"
        >
          <Save className="w-5 h-5" /> Lưu thay đổi
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Province Selector */}
        <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col h-[700px]">
          <div className="p-6 border-b border-slate-800 bg-slate-900/50">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Tìm tỉnh..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredProvinces.map((p) => (
              <div 
                key={p}
                onClick={() => handleProvinceSelect(p)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all group ${selectedProvince === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'hover:bg-slate-900 text-slate-400'}`}
              >
                <span className="font-bold text-sm">{p}</span>
                <ChevronRight className={`w-4 h-4 transition-all ${selectedProvince === p ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:opacity-50 group-hover:translate-x-0'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col h-[700px]">
          <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/20">
              {selectedProvince.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Chỉnh sửa trang: {selectedProvince}</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">URL: /{selectedProvince.toLowerCase().replace(/\s+/g, '-')}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* SEO Section */}
            <div className="space-y-6">
              <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" /> Tối ưu SEO (Meta Tags)
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tiêu đề SEO (Title Tag)</label>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                    <input 
                      type="text" 
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                      value={formData.seoTitle}
                      onChange={e => setFormData({ ...formData, seoTitle: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mô tả SEO (Meta Description)</label>
                  <textarea 
                    className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all min-h-[100px]"
                    value={formData.seoDesc}
                    onChange={e => setFormData({ ...formData, seoDesc: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-500" /> Nội dung bài viết
              </h4>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nội dung giới thiệu (Markdown/Text)</label>
                <textarea 
                  className="w-full p-6 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-emerald-600 outline-none transition-all min-h-[250px] font-mono text-sm leading-relaxed"
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
            </div>

            <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Info className="text-white w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Mẹo tối ưu SEO</h4>
                <p className="text-xs text-blue-200/70 leading-relaxed">
                  Hãy chèn từ khóa "đăng ký thi bằng lái xe tại {selectedProvince}" vào tiêu đề và mô tả để đạt thứ hạng cao trên Google. 
                  Nội dung bài viết nên dài ít nhất 300 chữ và cung cấp thông tin hữu ích về sân thi địa phương.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
