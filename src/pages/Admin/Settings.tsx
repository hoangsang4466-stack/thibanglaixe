import React, { useState } from 'react';
import { Save, Globe, Phone, Mail, MessageSquare, Facebook, Send, Image as ImageIcon, Type, FileText } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { toast } from 'react-hot-toast';

export default function AdminSettings() {
  const { settings, updateSettings } = useConfig();
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    toast.success('Đã lưu thay đổi!');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Cài đặt chung</h2>
          <p className="text-slate-500">Cấu hình thông tin cơ bản của website</p>
        </div>
        <button 
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20"
        >
          <Save className="w-5 h-5" /> Lưu thay đổi
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" /> Thông tin cơ bản
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tên website</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={formData.siteName}
                  onChange={e => setFormData({ ...formData, siteName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Logo URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={formData.logoUrl}
                  onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Hotline</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    value={formData.supportPhone}
                    onChange={e => setFormData({ ...formData, supportPhone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    value={formData.supportEmail}
                    onChange={e => setFormData({ ...formData, supportEmail: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-500" /> Liên kết hỗ trợ
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Link Zalo</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={formData.zaloLink}
                  onChange={e => setFormData({ ...formData, zaloLink: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nội dung auto chat Zalo</label>
              <textarea 
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all min-h-[100px]"
                value={formData.zaloAutoMsg}
                onChange={e => setFormData({ ...formData, zaloAutoMsg: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nhãn nút Chat Zalo</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={formData.zaloChatLabel}
                  onChange={e => setFormData({ ...formData, zaloChatLabel: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nhãn nút Tư vấn Zalo</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  value={formData.zaloConsultLabel}
                  onChange={e => setFormData({ ...formData, zaloConsultLabel: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Link Facebook</label>
                <div className="relative">
                  <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    value={formData.facebookLink}
                    onChange={e => setFormData({ ...formData, facebookLink: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Link Telegram</label>
                <div className="relative">
                  <Send className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    value={formData.telegramLink}
                    onChange={e => setFormData({ ...formData, telegramLink: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Content */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-500" /> Nội dung Banner chính
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tiêu đề Banner</label>
              <input 
                type="text" 
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                value={formData.bannerTitle}
                onChange={e => setFormData({ ...formData, bannerTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mô tả Banner</label>
              <textarea 
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all min-h-[100px]"
                value={formData.bannerDesc}
                onChange={e => setFormData({ ...formData, bannerDesc: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
