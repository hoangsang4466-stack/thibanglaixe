import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Copy, 
  ChevronRight, 
  Clock, 
  ShieldCheck,
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useOrders } from '../context/OrderContext';
import { useConfig } from '../context/ConfigContext';
import { toast } from 'react-hot-toast';
import { Order } from '../types';

export default function Payment() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getOrder, updateOrder } = useOrders();
  const { payment, settings } = useConfig();
  const [order, setOrder] = useState<Order | null>(location.state?.order || null);
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'qr'>(payment.qrEnabled ? 'qr' : 'transfer');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (!order && orderId) {
      const foundOrder = getOrder(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [orderId, order, getOrder]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Đã sao chép!');
  };

  const handlePaid = async () => {
    setIsVerifying(true);
    // Simulate 10-30s verification
    const delay = Math.floor(Math.random() * 10000) + 10000;
    
    setTimeout(async () => {
      try {
        if (orderId) {
          updateOrder(orderId, { status: 'paid' });
        }
        setIsPaid(true);
        toast.success('Thanh toán thành công!');
      } catch (error) {
        console.error('Error updating status:', error);
        toast.error('Có lỗi xảy ra, vui lòng liên hệ hỗ trợ.');
      } finally {
        setIsVerifying(false);
      }
    }, delay);
  };

  if (!order) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;

  if (isPaid) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-10 text-center border border-slate-100"
        >
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-14 h-14 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Thanh toán thành công!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Bạn đã đăng ký thành công. Mã đơn: <b>{order.id}</b>. Chúng tôi sẽ gửi SMS xác nhận cho bạn ngay lập tức.
          </p>
          
          <div className="bg-slate-50 p-6 rounded-3xl mb-8 border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">QR Code Đơn hàng</p>
            <div className="bg-white p-4 rounded-2xl inline-block shadow-sm">
              <QRCodeSVG 
                value={JSON.stringify({ id: order.id, name: order.fullName, date: order.examDate })} 
                size={160}
              />
            </div>
            <p className="mt-4 text-xs text-slate-400">Vui lòng lưu lại QR này để xuất trình khi đi thi.</p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <button 
                onClick={() => window.print()}
                className="flex-1 py-4 bg-slate-100 text-slate-900 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> In đơn
              </button>
              <button 
                onClick={() => navigate('/')}
                className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
              >
                Về trang chủ
              </button>
            </div>
            <button 
              onClick={() => navigate('/lookup')}
              className="w-full py-4 bg-white text-slate-500 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              Tra cứu hồ sơ sau này
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // VietQR format: https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.png?amount=<AMOUNT>&addInfo=<DESCRIPTION>&accountName=<ACCOUNT_NAME>
  const vietQrUrl = `https://img.vietqr.io/image/${payment.bankName}-${payment.accountNumber}-${payment.qrTemplate}.png?amount=${order.amount}&addInfo=${order.id}&accountName=${encodeURIComponent(payment.accountName)}`;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Left: Order Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black mb-6 tracking-tight">Chi tiết đơn hàng</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Mã đơn hàng</span>
                <span className="font-bold text-slate-900">{order.id}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Họ và tên</span>
                <span className="font-bold text-slate-900">{order.fullName}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Hạng bằng</span>
                <span className="font-bold text-blue-600">{order.licenseType}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Khu vực</span>
                <span className="font-bold text-slate-900">{order.province}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Ngày thi dự kiến</span>
                <span className="font-bold text-slate-900">{order.examDate}</span>
              </div>
              <div className="flex justify-between items-center pt-6">
                <span className="text-lg font-bold text-slate-900">Tổng thanh toán</span>
                <span className="text-3xl font-black text-blue-600">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.amount)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <p className="font-bold">Thanh toán an toàn</p>
                <p className="text-xs text-blue-300">Hệ thống bảo mật SSL 256-bit</p>
              </div>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed">
              Sau khi thanh toán, hệ thống sẽ tự động xác nhận và gửi SMS thông báo lịch thi chi tiết cho bạn trong vòng 30 giây.
            </p>
          </div>
        </motion.div>

        {/* Right: Payment Methods */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100"
        >
          <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
            {payment.qrEnabled && (
              <button
                onClick={() => setPaymentMethod('qr')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${paymentMethod === 'qr' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <QrCode className="w-4 h-4" /> Quét mã QR
              </button>
            )}
            {payment.transferEnabled && (
              <button
                onClick={() => setPaymentMethod('transfer')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${paymentMethod === 'transfer' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <CreditCard className="w-4 h-4" /> Chuyển khoản
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {paymentMethod === 'qr' ? (
              <motion.div
                key="qr"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <p className="text-sm text-slate-500 mb-6">Mở ứng dụng Ngân hàng/Ví điện tử để quét mã</p>
                <div className="bg-white p-6 rounded-[2rem] border-2 border-blue-50 inline-block mb-6 shadow-sm">
                  <img src={vietQrUrl} alt="VietQR" className="w-64 h-auto" />
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-8">
                  <Clock className="w-4 h-4" /> 
                  <span>Mã QR có hiệu lực trong 15:00</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="transfer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ngân hàng</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-slate-900">{payment.bankName}</p>
                      <button onClick={() => handleCopy(payment.bankName)} className="text-blue-600 hover:text-blue-700"><Copy className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Số tài khoản</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-black text-slate-900">{payment.accountNumber}</p>
                      <button onClick={() => handleCopy(payment.accountNumber)} className="text-blue-600 hover:text-blue-700"><Copy className="w-5 h-5" /></button>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Chủ tài khoản</p>
                    <p className="font-bold text-slate-900">{payment.accountName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nội dung chuyển khoản</p>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="font-black text-blue-900">{order.id}</p>
                      <button onClick={() => handleCopy(order.id)} className="text-blue-600 hover:text-blue-700"><Copy className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-800 leading-relaxed">
                    <b>Lưu ý:</b> Vui lòng nhập chính xác <b>Nội dung chuyển khoản</b> để hệ thống tự động xác nhận đơn hàng.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handlePaid}
            disabled={isVerifying}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <>
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                Đang xác thực giao dịch...
              </>
            ) : (
              <>Tôi đã thanh toán <ChevronRight className="w-6 h-6" /></>
            )}
          </button>
          
          <p className="text-center text-[10px] text-slate-400 mt-6 uppercase font-bold tracking-widest">
            Hỗ trợ kỹ thuật: {settings.supportPhone}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
