import { Timestamp } from 'firebase/firestore';

export type LicenseType = 'A1' | 'B1' | 'B2' | 'C';

export type OrderStatus = 'pending' | 'paid' | 'cancelled';

export interface Order {
  id: string; // BLX + timestamp
  fullName: string;
  phone: string;
  idNumber: string; // CCCD
  email: string;
  province: string;
  venue: string;
  licenseType: LicenseType;
  examDate: string;
  amount: number;
  status: OrderStatus;
  createdAt: Timestamp | Date;
}

export interface Review {
  name: string;
  location: string;
  content: string;
  rating: number;
}
