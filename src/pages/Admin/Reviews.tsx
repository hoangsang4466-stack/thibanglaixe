import React, { useState } from 'react';
import { Star, Plus, Trash2, Save, User, MapPin, MessageSquare, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { toast } from 'react-hot-toast';

export default function AdminReviews() {
  const { reviews, addReview, updateReview, deleteReview } = useConfig();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    content: '',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
    enabled: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    addReview(formData);
    setIsAdding(false);
    setFormData({
      name: '',
      location: '',
      content: '',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
      enabled: true
    });
    toast.success('Đã thêm đánh giá mới!');
  };

  const handleToggle = (id: string, enabled: boolean) => {
    updateReview(id, { enabled });
    toast.success(`${enabled ? 'Hiện' : 'Ẩn'} đánh giá thành công!`);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá đánh giá này?')) return;
    deleteReview(id);
    toast.success('Đã xoá đánh giá!');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Quản lý Đánh giá</h2>
          <p className="text-slate-500">Quản lý phản hồi từ học viên để tăng độ uy tín</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-xl ${isAdding ? 'bg-slate-800 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/20'}`}
        >
          {isAdding ? 'Huỷ bỏ' : <><Plus className="w-5 h-5" /> Thêm đánh giá</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[2.5rem] space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-500" /> Thêm đánh giá mới
          </h3>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tên hiển thị</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Địa điểm / Tỉnh</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Hà Nội"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Đánh giá (1-5 sao)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`p-2 rounded-xl transition-all ${formData.rating >= star ? 'text-yellow-500 bg-yellow-500/10' : 'text-slate-600 bg-slate-900'}`}
                    >
                      <Star className={`w-6 h-6 ${formData.rating >= star ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Ảnh đại diện URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    value={formData.avatar}
                    onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nội dung đánh giá</label>
                <textarea 
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all min-h-[120px]"
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Học viên đánh giá gì về trung tâm..."
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20"
              >
                Lưu đánh giá
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className={`bg-slate-950 border border-slate-800 p-6 rounded-[2rem] space-y-4 transition-all group ${!review.enabled ? 'opacity-50 grayscale' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-800" />
                <div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{review.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleToggle(review.id, !review.enabled)}
                  className={`p-2 rounded-xl transition-all ${review.enabled ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-900 text-slate-600'}`}
                  title={review.enabled ? 'Ẩn' : 'Hiện'}
                >
                  {review.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => handleDelete(review.id)}
                  className="p-2 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                  title="Xoá"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-slate-700'}`} />
              ))}
            </div>

            <p className="text-sm text-slate-400 leading-relaxed italic">
              "{review.content}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
