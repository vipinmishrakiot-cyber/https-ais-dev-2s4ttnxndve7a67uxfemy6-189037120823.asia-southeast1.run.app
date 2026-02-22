
export interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ScanResult {
  isGenuine: boolean;
  confidence: number;
  feedback: string;
  details?: {
    brandNameFound: boolean;
    logoDetected: boolean;
    fssaiVerified: boolean;
  };
}

export type Tab = 'home' | 'schedule' | 'store' | 'profile';

export interface DeliverySlot {
  id: string;
  day: string;
  date: string;
  status: 'scheduled' | 'pending' | 'delivered';
}
