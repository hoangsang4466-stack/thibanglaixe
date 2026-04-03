import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useConfig } from '../context/ConfigContext';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AIChat() {
  const { settings, prices } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Chào bạn! Tôi là trợ lý AI của ${settings.siteName}. Tôi có thể giúp gì cho bạn về việc đăng ký thi bằng lái xe?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";
      
      const priceInfo = prices.filter(p => p.enabled).map(p => `Bằng ${p.type}: ${new Intl.NumberFormat('vi-VN').format(p.price)}đ`).join(', ');
      
      const systemInstruction = `
        Bạn là trợ lý ảo thông minh của website "${settings.siteName}". 
        Thông tin trung tâm: Hotline ${settings.supportPhone}, Email ${settings.supportEmail}.
        Bảng giá hiện tại: ${priceInfo}.
        Nhiệm vụ: Tư vấn cho học viên về các hạng bằng lái xe (A1, A2, B1, B2, C), thủ tục hồ sơ, lệ phí và lịch thi.
        Phong cách: Thân thiện, chuyên nghiệp, ngắn gọn, súc tích.
        Luôn khuyến khích học viên đăng ký ngay trên website hoặc liên hệ Zalo ${settings.zaloLink} để được hỗ trợ nhanh nhất.
        Nếu học viên hỏi về luật giao thông, hãy trả lời dựa trên kiến thức chuẩn xác nhất.
      `;

      const response = await ai.models.generateContent({
        model: model,
        contents: messages.concat({ role: 'user', text: userMsg }).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "Xin lỗi, tôi gặp chút trục trặc. Bạn vui lòng thử lại hoặc liên hệ hotline nhé!";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Tôi đang bận một chút, bạn có thể liên hệ trực tiếp qua Zalo để được hỗ trợ ngay nhé!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 md:bottom-28 md:right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col transition-all duration-300 ${
              isMinimized ? 'h-16 w-72' : 'h-[500px] w-[350px] md:w-[400px]'
            }`}
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Trợ lý AI</p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <p className="text-[10px] opacity-80 uppercase font-bold tracking-widest">Đang trực tuyến</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50"
                >
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                        m.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Hỏi tôi bất cứ điều gì..."
                      className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-white text-blue-600 rounded-full shadow-2xl flex items-center justify-center border border-slate-100 relative group"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white" />
          <div className="absolute right-16 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-100">
            Hỏi AI tư vấn ngay!
          </div>
        </motion.button>
      )}
    </div>
  );
}
