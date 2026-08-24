export type CategoryType = 'all' | 'bakeries' | 'restaurants' | 'produce' | 'beverages' | 'supermarkets' | 'sweets';

export interface SurplusOffer {
  id: string;
  title: string;
  storeName: string;
  storeCategory: CategoryType;
  storeLogo?: string;
  originalPrice: number;
  price: number;
  remainingCount: number;
  totalCount: number;
  expiryMinutes: number; // minutes left
  distanceKm: number;
  area: string; // e.g. 'الزمالك', 'الدقي', 'الجيزة'
  fullAddress: string;
  imageUrl: string;
  description: string;
  rating: number;
  reviewsCount: number;
  pickupWindow: string; // e.g. "08:00 م - 09:30 م"
  coordinates: {
    lat: number;
    lng: number;
    xPercent: number; // for SVG interactive map representation
    yPercent: number;
  };
  bookingsCount: number;
  status: 'active' | 'sold_out' | 'expired';
  tags?: string[];
}

export interface Booking {
  id: string;
  bookingCode: string;
  offerId: string;
  offerTitle: string;
  storeName: string;
  price: number;
  quantity: number;
  subtotal: number;
  serviceFee: number; // عمولة المنصة: 5 جنيه على كل 100 جنيه (5%)
  totalAmount: number;
  paymentMethod: 'card' | 'vodafone_cash' | 'cash_on_pickup';
  pickupWindow: string;
  storeAddress: string;
  imageUrl: string;
  createdAt: string;
  status: 'confirmed' | 'ready' | 'completed' | 'cancelled';
  customerName: string;
  customerPhone: string;
}

export interface MerchantStats {
  totalEarnings: number; // in EGP (ج.م)
  rescuedMealsCount: number;
  averageRating: number;
  activeOffersCount: number;
  monthlyImpactKg: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  provider: 'google' | 'phone' | 'email';
  isMerchant: boolean;
}
