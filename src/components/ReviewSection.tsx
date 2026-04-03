import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export default function ReviewSection() {
  const { reviews } = useConfig();
  const activeReviews = reviews.filter(r => r.enabled);

  if (activeReviews.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Học viên nói gì về chúng tôi?</h2>
          <p className="text-slate-500">Hàng ngàn học viên đã tin tưởng và nhận bằng thành công.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activeReviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative">
              <Quote className="absolute top-6 right-6 text-blue-100 w-10 h-10" />
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 italic leading-relaxed">"{review.content}"</p>
              <div className="flex items-center gap-3">
                <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-bold text-slate-900">{review.name}</p>
                  <p className="text-xs text-slate-400">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
