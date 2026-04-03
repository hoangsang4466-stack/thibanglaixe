import React, { createContext, useContext, useState, useEffect } from 'react';
import { LICENSE_PRICES, PROVINCES, EXAM_VENUES, REVIEWS, BANK_INFO } from '../constants';
import { LicenseType } from '../types';

interface GlobalSettings {
  siteName: string;
  logoUrl: string;
  supportPhone: string;
  supportEmail: string;
  zaloLink: string;
  zaloAutoMsg: string;
  zaloChatLabel: string;
  zaloConsultLabel: string;
  facebookLink: string;
  telegramLink: string;
  bannerTitle: string;
  bannerDesc: string;
}

interface PriceSetting {
  type: LicenseType;
  price: number;
  enabled: boolean;
}

interface PaymentSettings {
  bankName: string;
  accountNumber: string;
  accountName: string;
  qrTemplate: string;
  enableTransfer: boolean;
  enableQR: boolean;
}

interface LandingPageConfig {
  province: string;
  seoTitle: string;
  seoDesc: string;
  content: string;
}

interface ReviewConfig {
  id: string;
  name: string;
  location: string;
  content: string;
  rating: number;
  avatar: string;
  enabled: boolean;
}

interface ConfigContextType {
  settings: GlobalSettings;
  prices: PriceSetting[];
  payment: PaymentSettings;
  provinces: string[];
  venues: Record<string, string[]>;
  landingPages: Record<string, LandingPageConfig>;
  reviews: ReviewConfig[];
  sms: { apiKey: string; template: string };
  updateSettings: (s: Partial<GlobalSettings>) => void;
  updatePrice: (type: LicenseType, updates: Partial<PriceSetting>) => void;
  updatePayment: (p: Partial<PaymentSettings>) => void;
  addProvince: (name: string) => void;
  deleteProvince: (name: string) => void;
  addVenue: (province: string, name: string) => void;
  deleteVenue: (province: string, name: string) => void;
  resetToDefaults: () => void;
  updateLandingPage: (province: string, config: Partial<LandingPageConfig>) => void;
  addReview: (r: Omit<ReviewConfig, 'id'>) => void;
  updateReview: (id: string, r: Partial<ReviewConfig>) => void;
  deleteReview: (id: string) => void;
  updateSMS: (s: { apiKey?: string; template?: string }) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<GlobalSettings>(() => {
    const saved = localStorage.getItem('gplx_settings');
    return saved ? JSON.parse(saved) : {
      siteName: 'GPLX Online',
      logoUrl: '',
      supportPhone: '1900 1234',
      supportEmail: 'support@gplx.vn',
      zaloLink: 'https://zalo.me/0912345678',
      zaloAutoMsg: 'Chào bạn, tôi cần tư vấn về bằng lái xe...',
      zaloChatLabel: 'Chat Zalo',
      zaloConsultLabel: 'Tư vấn qua Zalo',
      facebookLink: '#',
      telegramLink: '#',
      bannerTitle: 'Đăng ký thi bằng lái xe nhanh – có lịch sớm – hỗ trợ toàn quốc',
      bannerDesc: 'Hệ thống đăng ký trực tuyến uy tín, cam kết tỉ lệ đậu cao nhất, hồ sơ xử lý trong ngày.',
    };
  });

  const [prices, setPrices] = useState<PriceSetting[]>(() => {
    const saved = localStorage.getItem('gplx_prices');
    const version = localStorage.getItem('gplx_data_version');
    const defaultPrices = [
      { type: 'A1', price: 1500000, enabled: true },
      { type: 'B1', price: 12000000, enabled: true },
      { type: 'B2', price: 16500000, enabled: true },
      { type: 'C', price: 22000000, enabled: true },
    ];
    
    if (!version || version !== '1.2') {
      return defaultPrices;
    }
    return saved ? JSON.parse(saved) : defaultPrices;
  });

  const [payment, setPayment] = useState<PaymentSettings>(() => {
    const saved = localStorage.getItem('gplx_payment');
    return saved ? JSON.parse(saved) : {
      ...BANK_INFO,
      qrTemplate: 'compact2',
      enableTransfer: true,
      enableQR: true,
    };
  });

  const [provinces, setProvinces] = useState<string[]>(() => {
    const saved = localStorage.getItem('gplx_provinces');
    const version = localStorage.getItem('gplx_data_version');
    if (!version || version !== '1.2') {
      return PROVINCES;
    }
    return saved ? JSON.parse(saved) : PROVINCES;
  });

  const [venues, setVenues] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('gplx_venues');
    const version = localStorage.getItem('gplx_data_version');
    if (!version || version !== '1.2') {
      return EXAM_VENUES;
    }
    return saved ? JSON.parse(saved) : EXAM_VENUES;
  });

  const [landingPages, setLandingPages] = useState<Record<string, LandingPageConfig>>(() => {
    const saved = localStorage.getItem('gplx_landings');
    return saved ? JSON.parse(saved) : {};
  });

  const [reviews, setReviews] = useState<ReviewConfig[]>(() => {
    const saved = localStorage.getItem('gplx_reviews');
    return saved ? JSON.parse(saved) : REVIEWS.map((r, i) => ({ ...r, id: `rev-${i}`, enabled: true, avatar: `https://i.pravatar.cc/150?u=${i}` }));
  });

  const [sms, setSMS] = useState({ apiKey: '', template: 'Bạn đã đăng ký thành công. Mã đơn: {order_id}' });

  useEffect(() => {
    localStorage.setItem('gplx_settings', JSON.stringify(settings));
    localStorage.setItem('gplx_prices', JSON.stringify(prices));
    localStorage.setItem('gplx_payment', JSON.stringify(payment));
    localStorage.setItem('gplx_provinces', JSON.stringify(provinces));
    localStorage.setItem('gplx_venues', JSON.stringify(venues));
    localStorage.setItem('gplx_landings', JSON.stringify(landingPages));
    localStorage.setItem('gplx_reviews', JSON.stringify(reviews));
    localStorage.setItem('gplx_data_version', '1.2');
  }, [settings, prices, payment, provinces, venues, landingPages, reviews]);

  const updateSettings = (s: Partial<GlobalSettings>) => setSettings(prev => ({ ...prev, ...s }));
  const updatePrice = (type: LicenseType, updates: Partial<PriceSetting>) => 
    setPrices(prev => prev.map(p => p.type === type ? { ...p, ...updates } : p));
  const updatePayment = (p: Partial<PaymentSettings>) => setPayment(prev => ({ ...prev, ...p }));
  const addProvince = (name: string) => setProvinces(prev => [...prev, name]);
  const deleteProvince = (name: string) => setProvinces(prev => prev.filter(p => p !== name));
  const addVenue = (province: string, name: string) => setVenues(prev => ({ ...prev, [province]: [...(prev[province] || []), name] }));
  const deleteVenue = (province: string, name: string) => setVenues(prev => ({ ...prev, [province]: (prev[province] || []).filter(v => v !== name) }));
  
  const resetToDefaults = () => {
    setProvinces(PROVINCES);
    setVenues(EXAM_VENUES);
  };

  const updateLandingPage = (province: string, config: Partial<LandingPageConfig>) => 
    setLandingPages(prev => ({ ...prev, [province]: { ...(prev[province] || { province, seoTitle: '', seoDesc: '', content: '' }), ...config } }));
  const addReview = (r: Omit<ReviewConfig, 'id'>) => setReviews(prev => [{ ...r, id: `rev-${Date.now()}` }, ...prev]);
  const updateReview = (id: string, r: Partial<ReviewConfig>) => setReviews(prev => prev.map(item => item.id === id ? { ...item, ...r } : item));
  const deleteReview = (id: string) => setReviews(prev => prev.filter(item => item.id !== id));
  const updateSMS = (s: { apiKey?: string; template?: string }) => setSMS(prev => ({ ...prev, ...s }));

  return (
    <ConfigContext.Provider value={{ 
      settings, prices, payment, provinces, venues, landingPages, reviews, sms,
      updateSettings, updatePrice, updatePayment, addProvince, deleteProvince, addVenue, deleteVenue, 
      resetToDefaults, updateLandingPage, addReview, updateReview, deleteReview, updateSMS
    }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) throw new Error('useConfig must be used within a ConfigProvider');
  return context;
}
